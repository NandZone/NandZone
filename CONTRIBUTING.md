<!-- Part of this document was adapted from https://github.com/mui/.github/blob/master/CODE_OF_CONDUCT.md -->

# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of our community. Here are a few guidelines that will help you along the way.

## Code of Conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it.
Please read [the full text](./CODE-OF-CONDUCT.md) to understand what actions will and will not be tolerated.

## Your first Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/NandZone/NandZone/issues?q=is:open+is:issue+label:"good+first+issue") that contain changes that have a relatively limited scope. This label means that there is already a working solution to the issue in the discussion section. Therefore, it is a great place to get started.

If you decide to fix an issue, please make sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you have started to work on it, so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than a week, it's fine to take it over, but you should still leave a comment.
If there has been no activity on the issue for 7 to 14 days, it is safe to assume that nobody is working on it.

## Sending a Pull Request

This is a community project, so Pull Requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your Pull Requests small. To give a Pull Request the best chance of getting accepted, don't bundle more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

1. Make sure you have a [GitHub account](https://github.com), [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/) installed.

2. Fork the repository.

3. Clone the fork to your local machine and add upstream remote:

```sh
git clone https://github.com/<your username>/NandZone.git
cd NandZone
git remote add upstream https://github.com/NandZone/NandZone.git
```

4. Synchronize your local `main` branch with the upstream one:

```sh
git checkout main
git pull upstream main
```

5. Install the dependencies with npm:

```sh
npm install
```

6. Create a new topic branch:

```sh
git checkout -b my-topic-branch
```

7. Make changes, commit and push to your fork:

```sh
git add .
git commit -m "fix: fixed my-issue"
git push -u origin HEAD
```

8. Go to [the repository](https://github.com/NandZone/NandZone) and make a Pull Request.

We are monitoring for Pull Requests. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.

### Making Changes to the Application

To run the application locally, install the dependencies and run the development server:

```sh
npm install
npm start
```

For more information, you can take a look at Solid's [documentation and guides](https://www.solidjs.com).

### Coding style

Please follow the coding style of the project. We uses prettier, so if possible, enable format-on-save in your editor to automatically format your code.

- `npm run prettier` reformats the code.
<!-- - `npm run lint` runs manually the linting rules. -->

Finally, when you submit a Pull Request, they are run again by our continuous integration tools, but hopefully, your code is already clean!

## Roadmap

To get a sense of where this project is heading, or for ideas on where you could contribute, take a look at the [roadmap](./ROADMAP.md).

## License

By contributing your code to the [NandZone/NandZone](https://github.com/NandZone/NandZone) GitHub repository, you agree to license your contribution under [our license](./LICENSE).
