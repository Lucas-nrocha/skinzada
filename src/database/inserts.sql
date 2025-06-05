use skinzada;

select * from usuario;

select * from tentativas_quiz;

select * from respostas_usuario;

select * from perguntas;

DELETE FROM valor_skin
WHERE idSkins = 3;

DELETE FROM skins
WHERE idSkin = 3;

select * from skins;
select * from valor_skin;


insert into perguntas (pergunta,alternativa_a,alternativa_b,alternativa_c,alternativa_correta)
values
('A skin Karambit | Tiger Tooth pertence a qual coleção de facas?', 'Facas Clássicas', 'Facas Croma', 'Facas Selvagens', 'b'),

('Qual dessas skins possui um acabamento que muda conforme o ângulo de visão?', 'AK-47 | Redline', 'M4A1-S | Printstream', 'Desert Eagle | Blaze', 'b'),

('Qual é a skin de faca mais cara do jogo?', 'Karambit | Fade', 'Butterfly | Marble Fade', 'Karambit | Case Hardened (Blue Gem)', 'c'),

('A skin AK-47 | Fire Serpent faz parte de qual coleção?', 'The Bravo Collection', 'The Phoenix Collection', 'The Spectrum Collection', 'a');

INSERT INTO skins (nomeSkin, raridade) 
VALUES ('M4A4 | Howl', 'Lendária'),
('Desert Eagle | Blaze', 'Rara'),
('Glock-18 | Fade', 'Mítica'),
('Karambit | Tiger Tooth', 'Lendária');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(2, 1, '2025-06-01', 155.50),
(3, 2, '2025-05-01', 5000.00),
(4, 2, '2025-06-01', 5100.00),
(5, 3, '2025-05-01', 3000.00),
(6, 3, '2025-06-01', 3200.00),
(7, 4, '2025-05-01', 700.00),
(8, 4, '2025-06-01', 750.00),
(9, 5, '2025-05-01', 1200.00),
(10, 5, '2025-06-01', 1250.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(6, '★ Karambit | Tiger Tooth', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(11, 6, '2024-12-01', 8692.97),
(12, 6, '2025-01-01', 9012.50),
(13, 6, '2025-02-01', 9270.00),
(14, 6, '2025-03-01', 9527.50),
(15, 6, '2025-04-01', 9785.00),
(16, 6, '2025-05-01', 10008.06);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(7, 'AWP | Dragon Lore', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(17, 7, '2024-12-01', 66177.50),
(18, 7, '2025-01-01', 66950.00),
(19, 7, '2025-02-01', 67980.00),
(20, 7, '2025-03-01', 69525.00),
(21, 7, '2025-04-01', 70297.50),
(22, 7, '2025-05-01', 71070.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(8, 'M4A4 | Howl', 'Contrabando');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(17, 8, '2024-12-01', 36000.00),
(18, 8, '2025-01-01', 37500.00),
(19, 8, '2025-02-01', 38750.00),
(20, 8, '2025-03-01', 40000.00),
(21, 8, '2025-04-01', 41250.00),
(22, 8, '2025-05-01', 42500.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(9, 'AK-47 | Bloodsport', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(23, 9, '2024-12-01', 1000.00),
(24, 9, '2025-01-01', 1050.00),
(25, 9, '2025-02-01', 1100.00),
(26, 9, '2025-03-01', 1150.00),
(27, 9, '2025-04-01', 1200.00),
(28, 9, '2025-05-01', 1250.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(10, '★ M9 Bayonet | Lore', 'Secreto');

update skins set nomeSkin = 'AK-47 | Bloodsport' where idSkin = 9;

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(29, 10, '2024-12-01', 13500.00),
(30, 10, '2025-01-01', 13800.00),
(31, 10, '2025-02-01', 14100.00),
(32, 10, '2025-03-01', 14400.00),
(33, 10, '2025-04-01', 14700.00),
(34, 10, '2025-05-01', 15000.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(11, '★ Butterfly Knife | Gamma Doppler Emerald', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(35, 11, '2024-12-01', 110000.00),
(36, 11, '2025-01-01', 112500.00),
(37, 11, '2025-02-01', 115000.00),
(38, 11, '2025-03-01', 117500.00),
(39, 11, '2025-04-01', 120000.00),
(40, 11, '2025-05-01', 122500.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(12, 'M4A1-S | Fade', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(41, 12, '2024-12-01', 3600.00),
(42, 12, '2025-01-01', 3700.00),
(43, 12, '2025-02-01', 3800.00),
(44, 12, '2025-03-01', 3900.00),
(45, 12, '2025-04-01', 4000.00),
(46, 12, '2025-05-01', 4100.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(13, 'USP-S | Kill Confirmed', 'Secreta');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(47, 13, '2024-12-01', 1350.00),
(48, 13, '2025-01-01', 1370.00),
(49, 13, '2025-02-01', 1390.00),
(50, 13, '2025-03-01', 1410.00),
(51, 13, '2025-04-01', 1430.00),
(52, 13, '2025-05-01', 1450.00);

INSERT INTO skins (idSkin, nomeSkin, raridade) VALUES
(14, 'Glock-18 | Shinobu', 'Classificado');

INSERT INTO valor_skin (idValorSkin, idSkins, data_referencia, valor) VALUES
(53, 14, '2024-12-01', 125.00),
(54, 14, '2025-01-01', 130.00),
(55, 14, '2025-02-01', 135.00),
(56, 14, '2025-03-01', 140.00),
(57, 14, '2025-04-01', 145.00),
(58, 14, '2025-05-01', 150.00);

SELECT 
    skins.idSkin, skins.nomeSkin, 
    valor_skin.data_referencia,
    valor_skin.valor
FROM 
    skins
INNER JOIN 
    valor_skin 
ON 
    skins.idSkin = valor_skin.idSkins
ORDER BY 
    skins.nomeSkin, valor_skin.data_referencia, skins.idSkin;
x