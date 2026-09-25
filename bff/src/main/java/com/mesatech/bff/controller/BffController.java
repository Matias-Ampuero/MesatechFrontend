package com.mesatech.bff.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class BffController {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String solicitudesUrl = "http://localhost:8081";
    private final String catalogoUrl = "http://localhost:8082";

    @RequestMapping(value = {"/v1/solicitudes/**", "/v2/solicitudes/**"}, method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
            RequestMethod.PATCH, RequestMethod.DELETE })
    public ResponseEntity proxySolicitudes(HttpServletRequest request, @RequestBody(required = false) String body) {
        String url = solicitudesUrl + request.getRequestURI();
        if (request.getQueryString() != null) {
            url += "?" + request.getQueryString();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", request.getHeader("Authorization"));
        if (request.getHeader("Content-Type") != null) {
            headers.set("Content-Type", request.getHeader("Content-Type"));
        }
        if (request.getHeader("Accept") != null) {
            headers.set("Accept", request.getHeader("Accept"));
        }

        HttpEntity httpEntity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, HttpMethod.valueOf(request.getMethod()), httpEntity, String.class);
    }

    @RequestMapping(value = "/v1/catalogo/**", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
            RequestMethod.PATCH, RequestMethod.DELETE })
    public ResponseEntity proxyCatalogo(HttpServletRequest request, @RequestBody(required = false) String body) {
        String url = catalogoUrl + request.getRequestURI();
        if (request.getQueryString() != null) {
            url += "?" + request.getQueryString();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", request.getHeader("Authorization"));
        if (request.getHeader("Content-Type") != null) {
            headers.set("Content-Type", request.getHeader("Content-Type"));
        }
        if (request.getHeader("Accept") != null) {
            headers.set("Accept", request.getHeader("Accept"));
        }

        HttpEntity httpEntity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, HttpMethod.valueOf(request.getMethod()), httpEntity, String.class);
    }
}