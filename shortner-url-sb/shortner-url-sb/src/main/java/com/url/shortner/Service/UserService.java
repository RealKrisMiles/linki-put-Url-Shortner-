package com.url.shortner.Service;

import com.url.shortner.Dtos.LoginRequest;
import com.url.shortner.Entity.User;
import com.url.shortner.Repository.UserRepository;
import com.url.shortner.Security.JwtAuthenticationResponse;
import com.url.shortner.Security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {


    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest){
        //authenticating
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //generating token
        UserDetailImpl userDetail = (UserDetailImpl) authentication.getPrincipal();
        String jet = jwtUtil.generateToken(userDetail);

        return new JwtAuthenticationResponse(jet);
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name).orElseThrow(()-> new UsernameNotFoundException("Not found User "+name));
    }
}
