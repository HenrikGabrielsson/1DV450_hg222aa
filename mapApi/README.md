#REST API

Obs! <br />
Till REST API:et hör klasserna Creator, Tag, Memory med tilhörande controllers och helpers, samt AuthController och AuthHelper. Resten 
hör till Registreringsapplikationen. Tänk inte på dom.

##Installation

1. Gå till filen config/environments/development.rb och ändra fältet **config.baseurl** 
till det Domännamn och port som du tänker köra applikationen på. 

2. Öppna en konsol.

3. Skriv *rails db:migrate*

4. Skriv *rails db:seed*

5. skriv *rails s* för att köra igång API:et.

6. Starta POSTMAN och ladda in filen mapApi/tester.json för att kunna testa de olika funktionerna som finns.

7. För att logga in kan du använda dessa användaruppgifter:
{
  "userName": "henrik",
  "password":"password"
}
Lägg sedan till en header som ser ut såhär: <br/>
Authorization: (Strängen som du fick när du loggade in)


Tänk också på att API-nyckeln måste vara med vid varje anrop. Jag skapade en liten fusknyckel åt er, "testKey". Skapa en header till: <br/>
ApiKey: testKey


Hör av dig om det blir problem!

MVH Henrik

