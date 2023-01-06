### Magpie project design
1. Create and design the Magpie project, follow [this step](https://magpie-experiments.org/00_getting_started/01_installation/)
2. In the file *package.json*, change the "node" version to
```
"node": "^16.x",
```
3. In the file *src/magpie.config.js*, set the correct configurations according to the server you set (here using *Heroku*, where an app has been created with url: *cui-test-3.herokuapp.com*)
```
export default {
  // The following 3 lines can be obatained in *cui-test-3.herokuapp.com* by clicking the Edit in the experiment you created
  experimentId: '1',
  serverUrl: 'https://cui-test-3.herokuapp.com/',
  socketUrl: 'wss://cui-test-3.herokuapp.com/socket',
  // this will be used in prolific mode
  completionUrl: 'https://...',
  contactEmail: 'cui.ding@uzh.ch',
  // Either 'debug', 'directLink' or 'prolific'
  mode: 'directLink',
  language: 'en'
};
```
4. Upload the project to Github, make sure the project folders and files should be under the root directory so that the Github can automatically build the experiment and commit the output to the `gh-pages` branch. Once you enable GitHub Pages for your repository, GitHub will make the latest version of the `gh-pages` branch available publicly, see [here](https://magpie-experiments.org/03_deploying_experiments/05_hosting_on_github/)

### Deploy server
#### Heroku (online)
1. Clone the repository: https://github.com/magpie-ea/magpie-backend#deployment-with-heroku
2. In the *heroku-deploy.sh* file, change the line 15 *heroku addons:create heroku-postgresql:hobby-dev* to *heroku addons:create heroku-postgresql:mini* (the *mini* can also be *basic* etc. depending on the [plan](https://elements.heroku.com/addons/heroku-postgresql) you choose).
3.  Then run the script with `sh heroku-deploy.sh cui-test-3 USERNAME PASSWORD` (the *USERNAME* and *PASSWORD* can be different from the ones you log in Heroku). You will be prompted to the app with link *https://cui-test-3.herokuapp.com
4. In the app you can create new experiment and get the following parameters for the *magpie.config.json* file above by clicking *Edit*:
```
experimentId: '1',
  serverUrl: 'https://cui-test-3.herokuapp.com/',
  socketUrl: 'wss://cui-test-3.herokuapp.com/socket',
```

#### Docker (local)
1. In the file *src/magpie.config.js*, set the correct configurations:
```
export default {
  experimentId: '1',
  serverUrl: 'http://localhost:4000/',
  socketUrl: 'wss://cui-test-3.herokuapp.com/socket',
  // this will be used in prolific mode
  completionUrl: 'https://...',
  contactEmail: 'cui.ding@uzh.ch',
  // Either 'debug', 'directLink' or 'prolific'
  mode: 'directLink',
  language: 'en'
};
```

2. Follow the steps in this [link](https://github.com/magpie-ea/magpie-backend#deployment-with-heroku). Be aware that when you run `docker-compose up` you don't have to wait till it finishes before you visit `localhost:4000` in your browser.

### Host on Github pages

In the repo, go to *Settings-Pages-Brach-choose gh-pages* and then *save*. Refresh the page after a few minutes and you will get the link to your experiment, which will be the link sent to the experiment paticipants.
Optionally, you can custom the domain name in the *Custom Domain* on the same page.

### Manage the experimental results
1. Go to https://cui-test-3.herokuapp.com and log in.
2. Click *RETRIEVE CSV* and the csv file will be downloaded. Note that all the data from the paticipants will be all included and appended in this csv file.