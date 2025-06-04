create database skinzada;

use skinzada;

create table usuario(
	idUsuario int primary key auto_increment,
    nomeUsuario varchar(100),
    email varchar(200),
    senha varchar(30)
);

create table skins(
	idSkin int primary key auto_increment,
    nomeSkin varchar(200),
    raridade varchar(60)
    );
    
create table valor_skin(
	idValorSkin int,
    idSkins int,
    data_referencia date,
    valor decimal(10,2),
    primary key(idValorSkin,idSkins),
    foreign key (idSkins) references skins(idSkin)
    )auto_increment = 0;
    
create table perguntas(
	idPergunta int primary key auto_increment,
    pergunta varchar(400),
    alternativa_a varchar(255),
    alternativa_b varchar(255),
    alternativa_c varchar(255),
    alternativa_correta char(1) not null check(alternativa_correta in('a','b','c'))
    );
    
create table tentativas_quiz(
	idTentativa int auto_increment,
    idUsuario int,
    data_tentativa date,
    pontuacao decimal(10,2),
    primary key (idTentativa, idUsuario),
    foreign key (idUsuario) references usuario (idUsuario)
    );

    
create table respostas_usuario(
	idRespostaUsuario int auto_increment,
    idTentativa int,
    idUsuario int,
    idPergunta int,
    alternativa_respondida char(1),
    acertou boolean,
    primary key(idRespostaUsuario),
    foreign key (idTentativa, idUsuario) references tentativas_quiz(idTentativa, idUsuario),
    foreign key (idPergunta) references perguntas(idPergunta)
    );
