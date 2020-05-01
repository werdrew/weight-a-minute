# Weight a minute...

## What is this?

I plan on using this application to make a habit of tracking my weight everyday, since one of my #QuarantineGoals is to cut the weight I've gained over the last few weeks of the Spring 2020 semester.

## Goals

* **Simple**: It should only support the following features **initially**: logging weight on a date, viewing weight on a date, updating weight on a date, and viewing to-be-determined aggregations on weights over a range of dates (maybe some data viz here).
* **Extensible**: In case I end up wanting to add more features in the future.
* **Aesthetic**: Should be pretty enough to use as a browser homepage.

## Run an instance locally

### Pre-requisities

* Node/npm (I have versions 13.12.0 / 6.14.4))
* Docker (I have version 19.03.8)

### Edit config files

There is a `.env` file in both `api` and `frontend` with provided defaults.

For `api`:
```
PORT=5601
DB_PATH=db.local (the name of the sqlite3 db, will be created in the api root folder)
```

For `frontend`:
```
REACT_APP_API_HOST=localhost (host api is running on)
REACT_APP_API_PORT=5601 (port api is running on)
```

Whatever port is used for `PORT`/`REACT_APP_API_HOST` must also be used in two places: the `EXPOSE ${PORT}` directive in `api/Dockerfile` and `services:api:ports` in `docker-compose.yml`.

Additionally, the port the frontend runs on can be changed by adding a flag to the `CMD` directive in `frontend/Dockerfile`, e.g. `CMD ["serve", "-s", "build", "-l", "3000]`. By default, it'll
run on port 5000, which is reflected in `docker-compose.yml`, so if changed, that'll need to be updated to at `services:frontend:ports`.

### Run it

```
git clone git@github.com:werdrew/weight-a-minute.git
cd weight-a-minute
docker-compose up -d
```

Access the site at `localhost:5000`, or whatever port the frontend is running on.

### Set as your browser homepage?

[If you're using Chrome...](https://kb.nmsu.edu/page.php?id=72731)

[If you're using Firefox...](https://www.businessinsider.com/how-to-change-homepage-on-firefox)

## Known TODOs

* Mount sqlite db in persistent docker volume so it doesn't get overwritten between new image builds
* More aggregations, finer tuning in visualize tab, more data viz?
* Write tests, actually use ci!!, stop pushing directly to master :p