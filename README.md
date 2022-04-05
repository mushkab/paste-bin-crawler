# paste-bin-crawler

### instructions
- Install docker - https://docs.docker.com/get-docker/.
- Clone repo and navigate to its root in the terminal.
- Run ``` docker compose up ```.
- Application is up and running. It contains mongodb and node containers.
- Navigate (or curl) to ```localhost:4000/pastes?skip=0&limit=15``` to see pastes data or either download some mongodb client and connect to ```mongodb://localhost:27017```. db name is ```paste_synchronizer_production```.

### Important To Note
- Rate limits: pastebin.com enforces rate limits per ip and therfore i limited to crawel to 2 inserts a time so we wont get blocked.
- No support was added for editions/deletion intentionaly.
- pastebin.com supply also scrapping API - https://pastebin.com/doc_scraping_api - didnt use it ofcouse, should pay for that.



