package com.url.shortner.Service;

import com.url.shortner.Entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
public class UserDetailImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private  Long id;
    private String username;
    private String email;
    private String password;

   private Collection<? extends GrantedAuthority> authorities;

    public UserDetailImpl(Long id, Collection<? extends GrantedAuthority> authorities, String password, String email, String username) {

        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;

    }


    //it will conver the user from our database to userdetailimpl for the spring security to use
    public static UserDetailImpl build(User user){
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new UserDetailImpl(
                user.getId(),
                Collections.singletonList(authority),
                user.getPassword(),
                user.getEmail(),
                user.getUsername()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
