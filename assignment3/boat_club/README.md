 # How to run

1. clone the repo
2. cd 2dv513/assignment3/boat_club/
3. `npm install`
4. `npm start`
5. open localhost:3000

# API "RESTful"

**Create a member**
----
* **URL** `/api/members`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
	        "name": "sarpreet singh",
	        "age": 23,
	        "gender": "male"
        }

* **Success Response:**
    * **Code:** 201 <br />
        **Content:**

           {
            "member": {
                "id": 5,
                "name": "sarpreet singh",
                "age": 23,
                "gender": "male"
            }

---
**Create a boat**
----
* **URL** `/api/boats`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
	        "year": "1980",
	        "length": 2.8,
	        "memberId": "1",
            "type": "kayak"
        }

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
                
            {
                "boat": {
                    "id": 1,
                    "year": 1980,
                    "length": 2.8,
                    "owner": "sarpreet singh"
                    "type": "kayak"
                }
            }
            
---
**Create a boat type**
----
* **URL** `/api/boatTypes`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
            "type": "kayak"
        }

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
                
            {
                "boatType": {
                    "type": "kayak"
                }
            }
            
-----            
**Update a member**
----
* **URL** `/api/members`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
	        "name": "sarpreet singh buttar",
	        "age": 23,
	        "gender": "male",
            "id": 5
        }

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
                
           {
            "member": {
                "id": 5,
                "name": "sarpreet singh buttar",
                "age": 23,
                "gender": "male"
            }

---
**Update a boat**
----
* **URL** `/api/boats`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
            "id": 1,
            "year": 1980,
            "length": 12.8,
            "type": "kayak"
        }

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
                
           {
                "boat": {
                    "id": 1,
                    "year": 1980,
                    "length": 12.8,
                    "owner": "sarpreet singh"
                    "type": "kayak"
                }
            }

---
**Delete a member**
----
* **URL** `/api/members/:memberId`
* **Method:** `DELETE`
* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
                
            { 
                "message": "deleted successfully"
            }

---
**Delete a boat**
----
* **URL** `/api/boats/:boatId`
* **Method:** `DELETE`
* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
                
            { 
                "message": "deleted successfully"
            }

---
**Get members**
----
* **URL** `/api/members`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
                "members": [
                    {
                        "id": 1,
                        "name": "singh",
                        "age": 23,
                        "gender": "male"
                    }
                    ....
                ]
            }
---
**Get a member**
----
* **URL** `/api/members/:memberId`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
            "member": {
                "id": 5,
                "name": "sarpreet singh buttar",
                "age": 23,
                "gender": "male"
            }

---
**Get boats**
----
* **URL** `/api/boats`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
                "boats": [
                    {
                        "id": 1,
                        "year": 1980,
                        "length": 2.8,
                        "owner": "sarpreet singh",
                        "type": "kayak"
                    }
                    ...
                ]
            }

---
**Get a boat**
----
* **URL** `/api/boats/:boatId`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
                "boat": {
                    "id": 1,
                    "year": 1980,
                    "length": 2.8,
                    "owner": "sarpreet singh",
                    "type": "kayak"
                }
            }

----
**Get genders**
----
* **URL** `/api/genders`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
                "genders": [
                    {
                        "type": "female"
                    }
                    ...
                ]
            }

---
**Get boat types**
----
* **URL** `/api/boatTypes`
* **Method:** `GET`

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
            
            {
                "boatTypes": [
                    {
                        "type": "kayak"
                    }
                    ...
                ]
            }
