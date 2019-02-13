# expo-fp v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Comentario](#comentario)
	- [Create comentario](#create-comentario)
	- [Delete comentario](#delete-comentario)
	- [Retrieve comentario](#retrieve-comentario)
	- [Retrieve comentarios](#retrieve-comentarios)
	
- [Pregunta](#pregunta)
	- [Create pregunta](#create-pregunta)
	- [Delete pregunta](#delete-pregunta)
	- [Retrieve pregunta](#retrieve-pregunta)
	- [Retrieve preguntas](#retrieve-preguntas)
	- [Update pregunta](#update-pregunta)
	- [Update preguntas](#update-preguntas)
	
- [Proyecto](#proyecto)
	- [Create proyecto](#create-proyecto)
	- [Delete proyecto](#delete-proyecto)
	- [Retrieve proyecto](#retrieve-proyecto)
	- [Retrieve proyectos](#retrieve-proyectos)
	- [Update proyecto](#update-proyecto)
	
- [ProyectoRes](#proyectores)
	- [Create proyecto res](#create-proyecto-res)
	- [Delete proyecto res](#delete-proyecto-res)
	- [Retrieve proyecto res](#retrieve-proyecto-res)
	- [Update proyecto res](#update-proyecto-res)
	
- [User](#user)
	- [Create user](#create-user)
	- [Create user Android](#create-user-android)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update encuesta](#update-encuesta)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Comentario

## Create comentario



	POST /Comentarios


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| autor			| 			|  <p>Comentario's autor.</p>							|
| contenido			| 			|  <p>Comentario's contenido.</p>							|
| valoracion			| 			|  <p>Comentario's valoracion.</p>							|
| valido			| 			|  <p>Comentario's valido.</p>							|

## Delete comentario



	DELETE /Comentarios/:id


## Retrieve comentario



	GET /Comentarios/:id


## Retrieve comentarios



	GET /Comentarios


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Pregunta

## Create pregunta



	POST /preguntas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| pregunta			| 			|  <p>Pregunta's pregunta.</p>							|
| respuestas			| 			|  <p>Pregunta's respuestas.</p>							|

## Delete pregunta



	DELETE /preguntas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve pregunta



	GET /preguntas/:id


## Retrieve preguntas



	GET /preguntas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update pregunta



	PUT /preguntas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| pregunta			| 			|  <p>Pregunta's pregunta.</p>							|
| respuestas			| 			|  <p>Pregunta's respuestas.</p>							|

## Update preguntas



	PUT /illo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| pregunta			| 			|  <p>Pregunta's pregunta.</p>							|
| respuestas			| 			|  <p>Pregunta's respuestas.</p>							|

# Proyecto

## Create proyecto



	POST /Proyectos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Proyecto's nombre.</p>							|
| descripcion			| 			|  <p>Proyecto's descripcion.</p>							|
| curso			| 			|  <p>Proyecto's curso.</p>							|
| imagenes			| 			|  <p>Proyecto's imagenes.</p>							|
| autores			| 			|  <p>Proyecto's autores.</p>							|
| valoracionMedia			| 			|  <p>Proyecto's valoracionMedia.</p>							|
| comentarios			| 			|  <p>Proyecto's comentarios.</p>							|

## Delete proyecto



	DELETE /Proyectos/:id


## Retrieve proyecto



	GET /Proyectos/:id


## Retrieve proyectos



	GET /Proyectos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update proyecto



	PUT /Proyectos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Proyecto's nombre.</p>							|
| descripcion			| 			|  <p>Proyecto's descripcion.</p>							|
| curso			| 			|  <p>Proyecto's curso.</p>							|
| imagenes			| 			|  <p>Proyecto's imagenes.</p>							|
| autores			| 			|  <p>Proyecto's autores.</p>							|
| valoracionMedia			| 			|  <p>Proyecto's valoracionMedia.</p>							|
| comentarios			| 			|  <p>Proyecto's comentarios.</p>							|

# ProyectoRes

## Create proyecto res



	POST /ProyectoRes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Proyecto res's nombre.</p>							|
| imagen			| 			|  <p>Proyecto res's imagen.</p>							|
| curso			| 			|  <p>Proyecto res's curso.</p>							|
| proyecto			| 			|  <p>Proyecto res's proyecto.</p>							|

## Delete proyecto res



	DELETE /ProyectoRes/:id


## Retrieve proyecto res



	GET /ProyectoRes/:id


## Update proyecto res



	PUT /ProyectoRes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Proyecto res's nombre.</p>							|
| imagen			| 			|  <p>Proyecto res's imagen.</p>							|
| curso			| 			|  <p>Proyecto res's curso.</p>							|
| proyecto			| 			|  <p>Proyecto res's proyecto.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Create user Android



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update encuesta



	PUT /users/:id/encuesta

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| encuesta			| String			|  <p>User's new encuesta.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


