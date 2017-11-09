package com.bionic.controllers;

import com.sun.istack.internal.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "public.word")
public class Word implements Serializable {
    @Id
    @GeneratedValue(generator = "word_generator", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "word_generator", sequenceName = "word_id_seq", allocationSize = 1)
    @Column(name = "word_id")
    private Integer id;

    @Column(name = "creation_timestamp", columnDefinition = "timestamp without time zone")
    @NotNull
    private Date creationTimestamp;

    @Column(name = "text")
    @NotNull
    private String text;

    @Column(name = "translation")
    @NotNull
    private String translation;

    @ManyToMany(mappedBy = "words")
    private Set<User> users = new HashSet<User>();

    public Word(Date creationTimestamp, String text, String translation) {
        this.creationTimestamp = creationTimestamp;
        this.text = text;
        this.translation = translation;
    }

    public Word() {
    }

    public Integer getId() {
        return id;
    }

    public Date getCreationTimestamp() {
        return creationTimestamp;
    }

    public String getText() {
        return text;
    }

    public String getTranslation() {
        return translation;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCreationTimestamp(Date creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
