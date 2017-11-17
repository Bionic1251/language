package com.bionic.controllers;

import com.sun.istack.internal.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "public.pos")
public class POS {
    @Id
    @GeneratedValue(generator = "pos_generator", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "pos_generator", sequenceName = "pos_id_seq", allocationSize = 1)
    @Column(name = "pos_id")
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @OneToMany(mappedBy = "pos")
    private Set<Word> words;

    public POS(String name) {
        this.name = name;
    }

    public POS() {
    }

    public Set<Word> getWords() {
        return words;
    }

    public void setWords(Set<Word> words) {
        this.words = words;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
