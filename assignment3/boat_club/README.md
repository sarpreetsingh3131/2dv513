 # How to run

1. `npm install`
2. `npm start`

# API "RESTful"

## CRUD member

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
                "gender": 1
            }

---
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
                "gender": 1
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
                        "gender": 1
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
                "gender": 1
            }

-------------------
-------------------
## CRUD boat

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
                    "member_id": 1,
                    "type_id": 1
                }
            }

---
**Update a boat**
----
* **URL** `/api/members`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Body:**

        {
            "id": 1,
            "year": 1980,
            "length": 12.8,
            "memberId": 1,
            "type": "kayak"
        }

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
                
           {
                "id": 1,
                "year": 1980,
                "length": 12.8,
                "memberId": 1,
                "typeId": 1
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
                        "member_id": 1,
                        "type_id": 1
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
                    "member_id": 1,
                    "type_id": 1
                }
            }