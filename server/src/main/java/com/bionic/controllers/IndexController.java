package com.bionic.controllers;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.json.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class IndexController {
    private static final String OK_MESSAGE = "{\"msg\":\"OK\"}";
    private SimpleDateFormat dateFormat;
    private SessionFactory factory;

    public IndexController() {
        factory = new Configuration().configure().buildSessionFactory();
        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        //createFakeUser();
    }

    private User getUser(int id) {
        Session session = factory.openSession();
        Query<User> query = session.createQuery("select u from User u left outer join fetch u.words where u.id=:id");
        query.setParameter("id", id);
        User user = query.getSingleResult();
        session.close();
        return user;
    }


    @RequestMapping(value = "/add_word",
            method = RequestMethod.POST)
    public ResponseEntity<String> addWord(@RequestBody String jsonRequest) {
        JsonObject jsonObject = parseRequestParameters(jsonRequest);
        String text = jsonObject.getString("text");
        String translation = jsonObject.getString("translation");
        Integer userId = jsonObject.getInt("user_id");
        Word word = new Word(new Date(), text, translation);
        addWord(userId, word);
        return new ResponseEntity<String>(OK_MESSAGE, HttpStatus.OK);
    }

    private void addWord(Integer userId, Word word) {
        Set<Word> wordSet = new HashSet<Word>();
        wordSet.add(word);
        addWords(userId, wordSet);
    }

    private void addWords(Integer userId, Set<Word> newWords) {
        User user = getUser(userId);
        Session session = factory.openSession();
        session.beginTransaction();
        Set<Word> wordSet = new HashSet<Word>(user.getWords());
        wordSet.addAll(newWords);
        user.setWords(wordSet);
        session.saveOrUpdate(user);
        session.getTransaction().commit();
        session.close();
    }

    private JsonObject parseRequestParameters(String requestParams) {
        JsonReader reader = Json.createReader(new StringReader(requestParams));
        JsonObject jsonObject = reader.readObject();
        reader.close();
        return jsonObject;
    }


    @RequestMapping(value = "/get_words/{user_id}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<String> getWords(@PathVariable Integer user_id) {
        Session session = factory.openSession();
        Query<Word> query = session.createQuery("select w from Word w join w.users u where u.id=:user_id order by w.creationTimestamp desc");
        query.setParameter("user_id", user_id);
        List<Word> wordList = query.list();
        session.close();

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (Word word : wordList) {
            JsonObject obj = Json.createObjectBuilder()
                    .add("id", word.getId())
                    .add("text", word.getText())
                    .add("translation", word.getTranslation())
                    .build();
            jsonArrayBuilder.add(obj);
        }
        JsonArray jsonArray = jsonArrayBuilder.build();
        return new ResponseEntity<String>(jsonArray.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete_word/{userId}/{wordId}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<String> deleteWords(@PathVariable Integer userId, @PathVariable Integer wordId) {
        Session session = factory.openSession();
        User user = getUser(userId);
        Set<Word> newWords = new HashSet<Word>();
        for (Word word : user.getWords()) {
            if (word.getId().equals(wordId)) {
                continue;
            }
            newWords.add(word);
        }
        user.setWords(newWords);
        session.beginTransaction();
        session.saveOrUpdate(user);
        session.getTransaction().commit();
        session.close();
        return new ResponseEntity<String>(OK_MESSAGE, HttpStatus.OK);
    }

    @RequestMapping(value = "/upload_file", method = RequestMethod.POST)
    public ResponseEntity<String> submit(@RequestParam("file") MultipartFile file, @RequestParam("user_id") Integer userId) {
        try {
            String content = new String(file.getBytes());
            String[] lines = content.split("\r\n");
            Set<Word> wordSet = new HashSet<Word>();
            for (String line : lines) {
                String[] strWord = line.split(",");
                Date date = dateFormat.parse(strWord[2]);
                wordSet.add(new Word(date, strWord[0], strWord[1]));
            }
            addWords(userId, wordSet);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(OK_MESSAGE, HttpStatus.OK);
    }

    @RequestMapping(value = "/download_csv/{userId}", method = RequestMethod.GET)
    public void download(HttpServletResponse response, @PathVariable Integer userId) {
        response.setContentType("text/csv");
        try {
            PrintWriter writer = response.getWriter();
            User user = getUser(userId);
            for (Word word : user.getWords()) {
                writer.println(word.getText() + "," + word.getTranslation() + "," + dateFormat.format(word.getCreationTimestamp()));
            }
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void createFakeUser() {
        Session session = factory.openSession();
        session.beginTransaction();
        Word word1 = new Word(new Date(), "kyllä", "yes");
        User user = new User("bionic", "pass");
        Set<Word> wordSet = new HashSet<Word>();
        wordSet.add(word1);
        user.setWords(wordSet);
        session.save(user);
        session.getTransaction().commit();
        session.close();
    }
}
