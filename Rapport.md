# Compte Rendu TP Jukebox

## Binôme
- BAUVENT Melvyn
- CHATAIGNER Julien

## Choix de conception et de réalisation
On a décider de séparer l'application en 3 components principaux : celui pour ajouter des musiques, celui qui affiche la playlist, et celui qui joue la musique. Il y a également un component Track qui représente chaque track dans la playlist. Tout cela est relié par le composable usePlayList qui représente la liste des musiques ajoutées, et les propriétés de celle en train de jouer. Les components appellent donc des méthodes de usePlayList pour modifier la playlist ou avoir ses informations.  
On est resté sur un style assez simple en suivant simplement le modèle. La plus grosse différence est probablement la 4ème option de looping.

## Difficultés rencontrées (optionnel)
Les plus grosses difficultées ont d'abord été pour commencer le projet, vu qu'on avait peu d'expérience en vue (et globalement en js) on savait pas trop comment commencer mais heureusement la correction de todo list en vue servait un peu de guide.  
Ensuite deux de nos plus gros problèmes ont été pour rejouer la même musique (en repeat track, ou quand il y a une seule musique en repeat list) et pour correctement blocké les musiques, on a eu pas mal de cas où des musiques étaient bloqués alors qu'elles le devaient pas.

## Extensions réalisées (optionnel)
On n'a réalisé aucune des extensions proposées.