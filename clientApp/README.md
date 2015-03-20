#ClientApp - Minneskartan

##Ändringar på API:et 

Jag har inte gjort några större förändringar förutom att lägga till lite i config.ru för att tillåta CORS. Jag lade också till en metod för användare, *users/me* som skickar tillbaka den inloggade användaren. Inte jättenödvändigt kanske men fortfarande en användbar funktion. Jag såg också till så att sorteringen fungerade ordentligt när man skickar tillbaka alla minnen, vilket itne fungerade tidigare.


##Appen
Detta är en app där användare som är registrerade på API:et kan skriva ner minnen från händelser i livet, och spara dessa kopplade till en position (longitud, latitud). De kan också ta bort/uppdatera sina egna minnen och lägga till taggar på dessa. 



Appen finns 

##Instruktioner för att köra appen


1. Installera [Node.js](https://nodejs.org/). Du kan också använda till exempel nitrous.io där Node redan finns installerat.

2. använd konsollen i din utvecklingsmiljö. Gå till **1dv450_hg222aa/clientApp**

3. skriv **http-server -a [IP] -b [PORT]**, för att starta servern på vald adress.

4. Gå till adressen i webbläsaren och förhoppningsvis ser du då appen. 

<br>
Du kan skapa en egen användare genom att klicka på "registrera dig" eller använda följande uppgifter: 
<br>
username: henrik <br>
password: password <br>

<br><br>
Säg bara till om det blir problem!
