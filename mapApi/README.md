#REST API

Obs! <br />
Till REST API:et hör klasserna Creator, Tag, Memory med tilhörande controllers och helpers, samt AuthController och AuthHelper. Resten 
hör till Registreringsapplikationen. Tänk inte på dom.

##Installation

1. Gå till filen config/environments/development.rb och ändra fältet **config.baseurl** 
till det Domännamn och port som du tänker köra applikationen på. 

2. Öppna en konsol.

3. Skriv *bundle install* för att installera alla nödvändiga gems. Följande har jag lagt till själv förutom de som följer med Rails i vanliga fall:
  gem 'responders'

  gem 'geocoder'

  gem 'bcrypt', '~> 3.1.7'

  gem 'validates_email_format_of'

  gem 'tzinfo-data'

  gem 'jwt'



4. Skriv *rake db:migrate*

5. Skriv *rake db:seed*

6. skriv *rails s* för att köra igång API:et. Du kan också skriva *-b* för att välja en ip/hostname där applikationen ska köras, och *-p* för att välja port. Tex *rails s -b 0.0.0.0 -p 3000*.

7. Starta POSTMAN och ladda in filen mapApi/tester.json för att kunna testa de olika funktionerna som finns.

8. För att logga in kan du använda dessa användaruppgifter:
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

