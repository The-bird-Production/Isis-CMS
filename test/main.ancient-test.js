const request = require("supertest");

const db = require('../System/db')
const app = require('../app')




describe("Test the Main App without content", () => {
  beforeAll(() => {
    db.connect()
  });
  
    test("It should response the GET method", done => {
      request(app)
        .get("/test")
        .then(response => {
          expect(response.statusCode).toBe(200);
          
        });
        done()
    });
    afterAll((done) => {
      db.destroy()
      done()
      
    });
  });