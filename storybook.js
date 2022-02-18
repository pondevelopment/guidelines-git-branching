// https://coolors.co/44af69-f8333c-fcab10-2b9eb3-dbd5b5

const STYLE_BRANCH_FEATURE_LINE_WIDTH = 5;

const STYLE_BRANCH_MAIN_LINE_WIDTH = 8;
const STYLE_BRANCH_MAIN_COLOR = '#888888';
const STYLE_BRANCH_MAIN_COLOR_TEXT = '#888888';
const STYLE_BRANCH_MAIN_COLOR_DOT = '#888888';

const STYLE_BRANCH_SPRINT_LINE_WIDTH = 6;
const STYLE_BRANCH_SPRINT_COLOR = '#AAFF00';
const STYLE_BRANCH_SPRINT_COLOR_TEXT = '#AAFF00';
const STYLE_BRANCH_SPRINT_COLOR_DOT = '#AAFF00';

const STYLE_BRANCH_HOTFIX_LINE_WIDTH = 6;
const STYLE_BRANCH_HOTFIX_COLOR = '#00AAFF';
const STYLE_BRANCH_HOTFIX_COLOR_TEXT = '#00AAFF';
const STYLE_BRANCH_HOTFIX_COLOR_DOT = '#00AAFF';

const STYLE_BRANCH_A_COLOR = '#FCAB10';
const STYLE_BRANCH_A_COLOR_TEXT = '#FCAB10';
const STYLE_BRANCH_A_COLOR_DOT = '#FCAB10';
const STYLE_BRANCH_B_COLOR = '#2B9EB3';
const STYLE_BRANCH_B_COLOR_TEXT = '#2B9EB3';
const STYLE_BRANCH_B_COLOR_DOT = '#2B9EB3';
const STYLE_BRANCH_C_COLOR = '#44AF69';
const STYLE_BRANCH_C_COLOR_TEXT = '#44AF69';
const STYLE_BRANCH_C_COLOR_DOT = '#44AF69';
const STYLE_BRANCH_D_COLOR = '#DBD5B5';
const STYLE_BRANCH_D_COLOR_TEXT = '#DBD5B5';
const STYLE_BRANCH_D_COLOR_DOT = '#DBD5B5';

const HASH_MERGE_SPRINT_ONE = 'merge-sprint-one';
const HASH_MERGE_BRANCH_A = 'merge-branch-a';

const author = {
  zeger: 'Zeger Knops <zeger.knops@pon.com>',
  berry: 'Berry Piest <berry.piest@pon.com>',
  jos: 'Dennis Verweij <dennis.verweij@pon.com>',
};

for (let idx = 1; idx < 27; idx++) {
  const graphElement = document.createElement('div');

  graphElement.id = 'graph-container-' + idx;

  const textElement = graphElement.cloneNode();
  textElement.className = 'w-25 text-start';
  textElement.id = 'text-container-' + idx;

  const rootElement = document.createElement('li');
  rootElement.className =
    'list-group-item text-white bg-dark d-flex justify-content-between';
  rootElement.appendChild(graphElement);
  rootElement.appendChild(textElement);

  document.getElementById('graph-list').appendChild(rootElement);

  buildGraph(graphElement, textElement, idx);
}

/**
 * Main call to show the gitgraph up to the given step
 *
 * @param {HTMLElement} graphContainer
 * @param {HTMLElement} textContainer
 * @param {Number} step
 */
function buildGraph(graphContainer, textContainer, step) {
  let customTemplate;
  let gitgraph;
  let main;
  let sprintOne; let sprintTwo;
  let branchA; let branchB; let branchC; let branchD; let branchHotfix;

  [
    (showBody) => {
      customTemplate =
        GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
          commit: {
            spacing: 35,
            message: {
              font: '10pt sans-serif',
            },
            dot: {
              size: 10,
              font: '8pt sans-serif',
            },
          },
          branch: {
            spacing: 35,
            label: {
              font: '10pt sans-serif',
            },
          },
        });

      gitgraph = GitgraphJS.createGitgraph(graphContainer, {
        orientation: 'vertical-reverse',
        branchLabelOnEveryCommit: true,
        template: customTemplate,
      });

      main = gitgraph.branch({
        name: 'main',
        style: {
          color: STYLE_BRANCH_MAIN_COLOR,
          lineWidth: STYLE_BRANCH_MAIN_LINE_WIDTH,
        },
      });

      main.commit({
        subject: 'Initial commit',
        dotText: '🌱',
        body: showBody && `
          Inital commit created on the branch named "main"
        `,
        author: author.zeger,
        style: {
          color: STYLE_BRANCH_MAIN_COLOR_TEXT,
          message: {
            color: STYLE_BRANCH_MAIN_COLOR_TEXT,
          },
          dot: {
            color: STYLE_BRANCH_MAIN_COLOR_DOT,
          },
        },
      });

      textContainer.innerHTML = `
        Start of the project is here. Setup a git repository, check 
        for license and add the developers. Setup the main branch, 
        this will be the branch containing the lastest stable version
        of the software.
      `;
    },
    (showBody) => {
      sprintOne = main.branch({
        name: 'Sprint 1',
        style: {
          color: STYLE_BRANCH_SPRINT_COLOR,
          lineWidth: STYLE_BRANCH_SPRINT_LINE_WIDTH,
          message: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
          },
          dot: {
            color: STYLE_BRANCH_SPRINT_COLOR_DOT,
          },
        },
      });

      sprintOne.commit({
        subject: 'Sprint branch',
        dotText: '0',
        body: showBody && `
          Create a seperate branch for "Sprint 1"
        `,
        author: author.zeger,
      });

      textContainer.innerHTML = `
        For a sprint a seperate branch is created, this will
        be used to merge all the code the developers are writing
        for this specific sprint. This branch is based on the 
        latest version of the main branch. Note that
        commit '0' is the actual creation of the branch.
      `;
    },
    (showBody) => {
      sprintOne
          .commit({
            subject: 'Fixed JIRA-123',
            dotText: '1',
            author: author.zeger,
          })
          .commit({
            subject: 'Fixed JIRA-124',
            dotText: '2',
            author: author.berry,
          })
          .commit({
            subject: 'Fixed JIRA-125',
            dotText: '3',
            body: showBody && `
              Developers working on the current sprint and commit their code
            `,
            author: author.jos,
          })
      ;

      textContainer.innerHTML = `
        Sprint 1 is a simple sprint, several developers have been
        working on 3 issues and commit their results one by one to the
        sprint branch. Any merge issues have to be resolved by the developer.
      `;
    },
    (showBody) => {
      main.merge({
        branch: sprintOne,
        commitOptions: {
          subject: 'Merge sprint 1',
          body: showBody && `
            Work is done on the sprint, test the branch and merge it back to main
          `,
          hash: HASH_MERGE_SPRINT_ONE,
          author: author.jos,
          style: {
            color: STYLE_BRANCH_MAIN_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_MAIN_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_MAIN_COLOR_DOT,
            },
          },
        },
      }).tag('v1.0.0');

      textContainer.innerHTML = `
      
      `;
    },
    (showBody) => {
      /**
      * Second sprint
      */
      sprintTwo = gitgraph.branch({
        name: 'Sprint 2',
        from: HASH_MERGE_SPRINT_ONE,
        style: {
          color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
          lineWidth: STYLE_BRANCH_SPRINT_LINE_WIDTH,
          message: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
          },
          dot: {
            color: STYLE_BRANCH_SPRINT_COLOR_DOT,
          },
        },
      });

      sprintTwo.commit({
        subject: 'Sprint 2 branch',
        body: showBody && `
          Create the branch for the second sprint
        `,
        author: author.zeger,
      });
    },
    (showBody) => {
      branchA = sprintTwo.branch({
        name: 'Feature JIRA-223', from: HASH_MERGE_SPRINT_ONE,
        style: {
          color: STYLE_BRANCH_A_COLOR,
          lineWidth: STYLE_BRANCH_FEATURE_LINE_WIDTH,
        },
      });

      // Dev cycle 1
      branchA
          .commit({
            subject: '+wrote some code JIRA-223',
            body: showBody && `
            Separate branch for sprint 2 to work on a specfic feature
          `,
            author: author.zeger,
            style: {
              color: STYLE_BRANCH_A_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_A_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_A_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => {
      branchB = sprintTwo.branch({
        name: 'Bugfix JIRA-224', from: HASH_MERGE_SPRINT_ONE,
        style: {
          color: STYLE_BRANCH_B_COLOR,
          lineWidth: STYLE_BRANCH_FEATURE_LINE_WIDTH,
        },
      });

      branchB
          .commit({
            subject: '+wrote some code JIRA-224',
            body: showBody && `
                Separate branch for sprint 2 to fix a bug
            `,
            author: author.berry,
            style: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_B_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_B_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => {
      branchC = sprintTwo.branch({
        name: 'Task JIRA-225', from: HASH_MERGE_SPRINT_ONE,
        style: {
          color: STYLE_BRANCH_C_COLOR,
          lineWidth: STYLE_BRANCH_FEATURE_LINE_WIDTH,
        },
      });

      branchC
          .commit({
            subject: '+wrote some code JIRA-225',
            body: showBody && `
            Separate branch for sprint 2 to work on a task
          `,
            author: author.jos,
            style: {
              color: STYLE_BRANCH_C_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_C_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_C_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => { // Step 11
      // Dev cycle 2
      branchA
          .commit({
            subject: '*fixed some code JIRA-223',
            author: author.zeger,
            style: {
              color: STYLE_BRANCH_A_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_A_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_A_COLOR_DOT,
              },
            },
          });

      branchB
          .commit({
            subject: '*fixed some code JIRA-224',
            author: author.berry,
            style: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_B_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_B_COLOR_DOT,
              },
            },
          });

      branchC
          .commit({
            subject: '*fixed some code JIRA-225',
            author: author.jos,
            body: showBody && `
              Developers working on their tasks and commiting the code
            `,
            style: {
              color: STYLE_BRANCH_C_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_C_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_C_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => { // Step 12
      sprintTwo.merge({
        branch: branchC,
        commitOptions: {
          subject: 'Merge \'Task JIRA-225\' to sprint 2 branch',
          author: author.jos,
          body: showBody && `
                  Task done, code is merged back to sprint branch
                `,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });
    },
    (showBody) => { // Step 13
      branchA.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge sprint 2',
          author: author.zeger,
          style: {
            color: STYLE_BRANCH_A_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_A_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_A_COLOR_DOT,
            },
          },
        },
      });

      branchB.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge sprint 2',
          author: author.zeger,
          body: showBody && `
            Merge the changes back from the sprint branch to the issues branches
          `,
          style: {
            color: STYLE_BRANCH_B_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_B_COLOR_DOT,
            },
          },
        },
      });
    },
    (showBody) => { // Step 14
      branchHotfix = main.branch({
        name: 'hotfix',
        style: {
          color: STYLE_BRANCH_HOTFIX_COLOR,
          lineWidth: STYLE_BRANCH_HOTFIX_LINE_WIDTH,
        },
      });

      // Hotfix
      branchHotfix
          .commit({
            subject: '*hotfix',
            author: author.jos,
            body: showBody && `
              Problem on live environment, hotfix build and
              tested on hotfix branch
            `,
            style: {
              color: STYLE_BRANCH_HOTFIX_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_HOTFIX_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_HOTFIX_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => { // Step 15
      main.merge({
        branch: branchHotfix,
        commitOptions: {
          subject: 'Merge hotfix to main branch',
          author: author.jos,
          body: showBody && `
                  Merge hotfix to main branch and tag with new version
                `,
        },
      }).tag('v1.1.0');
    },
    (showBody) => { // Step 17
      sprintTwo.merge({
        branch: main,
        commitOptions: {
          subject: 'Merge hotfix to sprint 2 branch',
          author: author.jos,
          body: showBody && `
                  Merge hotfix to sprint branch
                `,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });
    },
    (showBody) => { // Step 18
      branchA.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge hotfix to feature branch',
          author: author.zeger,
          style: {
            color: STYLE_BRANCH_A_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_A_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_A_COLOR_DOT,
            },
          },
        },
      });

      branchB.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge hotfix to feature branch',
          author: author.berry,
          style: {
            color: STYLE_BRANCH_B_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_B_COLOR_DOT,
            },
          },
        },
      });

      branchC.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge hotfix to feature branch',
          author: author.jos,
          body: showBody && `
                                      Feature branches also require the hotfix
                                    `,
          style: {
            color: STYLE_BRANCH_C_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_C_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_C_COLOR_DOT,
            },
          },
        },
      });
    },
    (showBody) => { // Step 19
      branchA
          .commit({
            subject: '-removed some code JIRA-223',
            author: author.zeger,
            style: {
              color: STYLE_BRANCH_A_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_A_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_A_COLOR_DOT,
              },
            },
          });


      sprintTwo.merge({
        branch: branchA,
        commitOptions: {
          subject: 'Merge \'Feature JIRA-223\' to sprint 2 branch',
          author: author.zeger,
          body: showBody && `
                  Issue resolved and coding done, merge changes to sprint branch
                                    `,
          hash: HASH_MERGE_BRANCH_A,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });
    },
    (showBody) => { // Step 20
      branchD = gitgraph.branch({
        name: 'Feature JIRA-228', from: HASH_MERGE_BRANCH_A,
        style: {
          color: STYLE_BRANCH_D_COLOR,
          lineWidth: STYLE_BRANCH_FEATURE_LINE_WIDTH,
        },
      });

      branchD
          .commit({
            subject: '-removed some code JIRA-228',
            author: author.zeger,
            body: showBody && `
              New issue picked up, branch from sprint branch to start coding
            `,
            style: {
              color: STYLE_BRANCH_D_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_D_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_D_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => { // Step 21
      branchB
          .commit({
            subject: '-removed some code JIRA-224',
            author: author.berry,
            style: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_B_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_B_COLOR_DOT,
              },
            },
          });

      branchC
          .commit({
            subject: '-removed some code JIRA-225224',
            author: author.jos,
            style: {
              color: STYLE_BRANCH_C_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_C_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_C_COLOR_DOT,
              },
            },
          });

      branchD
          .commit({
            subject: '*bugfix JIRA-228',
            author: author.zeger,
            body: showBody && `
              Developers working on their issues and committing
              to the issue branch
            `,
            style: {
              color: STYLE_BRANCH_D_COLOR_TEXT,
              message: {
                color: STYLE_BRANCH_D_COLOR_TEXT,
              },
              dot: {
                color: STYLE_BRANCH_D_COLOR_DOT,
              },
            },
          });
    },
    (showBody) => { // Step 22
      branchB.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge hotfix to feature branch',
          author: author.berry,
          style: {
            color: STYLE_BRANCH_B_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_B_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_B_COLOR_DOT,
            },
          },
        },
      });

      branchC.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge hotfix to feature branch',
          author: author.jos,
          body: showBody && `
            Before the feature branches can commit to the sprint branch they
            must merge all the changes to their own branch.
          `,
          style: {
            color: STYLE_BRANCH_C_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_C_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_C_COLOR_DOT,
            },
          },
        },
      });

      textContainer.innerHTML = `
        The developers of the bugfix and task branches must merge the code from
        the sprint to their own code, and fix any merge issues locally, before
        they can merge their final code to the sprint branch.
      `;
    },
    (showBody) => { // Step 23
      sprintTwo.merge({
        branch: branchB,
        commitOptions: {
          subject: 'Merge \'Bugfix JIRA-224\' to sprint 2 branch',
          author: author.berry,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });

      sprintTwo.merge({
        branch: branchC,
        commitOptions: {
          subject: 'Merge \'Task JIRA-225\' to sprint 2 branch',
          author: author.jos,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });

      sprintTwo.merge({
        branch: branchD,
        commitOptions: {
          subject: 'Merge \'Task JIRA-228\' to sprint 2 branch',
          author: author.jos,
          body: showBody && `
                  All issues coded, code is merged back into the sprint branch
                `,
          style: {
            color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_SPRINT_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_SPRINT_COLOR_DOT,
            },
          },
        },
      });

      textContainer.innerHTML = `
        
        `;
    },
    (showBody) => { // Step 24
      main.merge({
        branch: sprintTwo,
        commitOptions: {
          subject: 'Merge sprint 2',
          author: author.jos,
          body: showBody && `
                    Test the sprint branch and merge to main
                                    `,
          style: {
            color: STYLE_BRANCH_MAIN_COLOR_TEXT,
            message: {
              color: STYLE_BRANCH_MAIN_COLOR_TEXT,
            },
            dot: {
              color: STYLE_BRANCH_MAIN_COLOR_DOT,
            },
          },
        },
      }).tag('v2.0.0');
    },
    (showBody) => { // Step 26
    },
    (showBody) => { // Step 27
    },
    (showBody) => { // Step 28
    },
  ].slice(0, step).forEach((gitAction, index) => gitAction(index == step - 1));
  /**
   * We want to show the git story step by step, so slice the array for each step
   * [0], [0, 1], [0, 1, 2] etc. - next call the draw function on the final git 
   * action for that step
   */
}
