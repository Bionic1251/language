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
import org.springframework.web.bind.annotation.*;

import javax.json.*;
import javax.servlet.http.HttpServletRequest;
import java.io.StringReader;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class IndexController {
    private static final String OK_MESSAGE = "{\"msg\":\"OK\"}";
    private SessionFactory factory;

    public IndexController() {
        factory = new Configuration().configure().buildSessionFactory();
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
        Session session = factory.openSession();
        session.beginTransaction();
        User user = getUser(userId);
        Word word = new Word(new Date(), text, translation);
        Set<Word> wordSet = new HashSet<Word>(user.getWords());
        wordSet.add(word);
        user.setWords(wordSet);
        //user.getWords().add(word);
        //Set<User> users = new HashSet<User>(word.getUsers());
        //users.add(user);
        //word.setUsers(users);
        //session.saveOrUpdate(word);
        session.saveOrUpdate(user);
        session.getTransaction().commit();
        session.close();
        return new ResponseEntity<String>(OK_MESSAGE, HttpStatus.OK);
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
