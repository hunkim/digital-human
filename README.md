
# digital-human
I created this to make lecture videos using digital human. Concept is quite simple.
![image](https://user-images.githubusercontent.com/901975/115944140-8ffba880-a4e6-11eb-9422-e59626f9fe60.png)

See the quick demo video:
![vh-talk](https://user-images.githubusercontent.com/901975/115944207-f84a8a00-a4e6-11eb-8120-68196a8d2788.gif)
https://user-images.githubusercontent.com/901975/115944150-98ec7a00-a4e6-11eb-911b-294aaea79741.mp4


## Setup
1. Create account/Login
https://creator.uneeq.io/dashboard

![image](https://user-images.githubusercontent.com/901975/115943588-5a08f500-a4e3-11eb-9e5b-4757a89062b9.png)

2. Create a persona and get the id (AKA UNEEQ_WORKSPACE)
![image](https://user-images.githubusercontent.com/901975/115943711-385c3d80-a4e4-11eb-9647-8360fa0009f5.png)


3. Go to Deploy/Build your own and get the key (UNEEQ_SECRET) and API URL (UNEEQ_URI).
https://creator.uneeq.io/deploy/build-your-own
![image](https://user-images.githubusercontent.com/901975/115943641-a9e7bc00-a4e3-11eb-8c07-e162829ec325.png)


4. Clone https://gitlab.com/uneeq-oss/examples and install

5. run the token server. https://gitlab.com/uneeq-oss/examples/-/tree/master/token/node 
Environment variables are configurable via .env and will be provided to you.

* UNEEQ_URI The UneeQ server you will retrieve the token from.
* UNEEQ_SECRET The UneeQ secret used to secure the token request.
* UNEEQ_WORKSPACE The conversation workspace you want to generate a token for. A token will only be able to start a
session for the conversation workspace if you generated the token using the same workspace id. The workspace
conversation follows GUID format (e.g. 5d4f1723-4f23-4086-bf91-00b1e58da7f8).

6. run virtual human https://gitlab.com/uneeq-oss/examples/-/tree/master/web/node. 
For somethow, I cannot run this using local server. After npm star, I opened the index.html local file using browser. For example, open file://.../index.html

7. Create Google slide and edit app script
![image](https://user-images.githubusercontent.com/901975/115943933-5b3b2180-a4e5-11eb-9acc-3504e5e27cd8.png)

8. copy speak.gs and sidebar.html. Modity the uneeqJWTSecret
![image](https://user-images.githubusercontent.com/901975/115944004-eae0d000-a4e5-11eb-9070-045b1bf966d4.png)



## Let's speak (You only need to do this after installation)

1. Get the virtual human session id.
![image](https://user-images.githubusercontent.com/901975/115943870-01d2f280-a4e5-11eb-8bdf-89e63b9b34a4.png)

2. Put the session id in the first slide note
![image](https://user-images.githubusercontent.com/901975/115944095-5fb40a00-a4e6-11eb-906a-a3de96f8c85d.png)


2. Select add-on/Virtual Human/Speak and Press the "speak" button in the sidebar
![image](https://user-images.githubusercontent.com/901975/115944050-30050200-a4e6-11eb-88c3-40bd7776c556.png)
