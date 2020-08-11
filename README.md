# assignment_showoff
Temporal repository for interview assignment


RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

Assumptions:
  Assuming that “startDate” and “endDate” fields are mandatory, while minCount/maxCount are not.


Commands:
  Run api: *npm run start*
  Run tests: *npm run test*

Notes:
  Before launch you have to set MongoDB url and port for an app, using .env file(@see env.dist example)