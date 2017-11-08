package com.bionic.controllers;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "public.user")
public class User implements Serializable {
    @Id
    @GeneratedValue(generator = "user_generator", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "user_generator", sequenceName = "user_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
