package com.bionic.controllers;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import java.util.Date;
import java.util.List;

@Controller
public class IndexController {
    private SessionFactory factory;

    public IndexController() {
        factory = new Configuration().configure().buildSessionFactory();
    }


    @RequestMapping(value = "/add_word/{text}/{translation}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<String> addWord(Model m,
                                          @PathVariable String text,
                                          @PathVariable String translation) {
        Session session= factory.openSession();
        session.beginTransaction();
        Word word = new Word(new Date(), text, translation);
        session.save(word);
        session.getTransaction().commit();
        session.close();
        return new ResponseEntity<String>(HttpStatus.OK);
        /*JsonObject jsonObject = Json.createObjectBuilder()
                .add("text", text)
                .add("translation", translation)
                .build();
        return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);*/
    }

    @RequestMapping(value = "/get_words",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<String> getWords(Model m) {
        Session session= factory.openSession();
        Query<Word> query = session.createQuery("from Word order by creationTimestamp desc");
        List<Word> wordList = query.list();
        session.close();

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for(Word word : wordList){
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

    @RequestMapping(value = "/delete_word/{id}",
            method = RequestMethod.GET,
            produces = "application/json")
    public ResponseEntity<String> deleteWords(Model m, @PathVariable Integer id) {
        Session session= factory.openSession();
        Word word = new Word();
        word.setId(id);
        session.beginTransaction();
        session.delete(word);
        session.getTransaction().commit();
        session.close();
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
