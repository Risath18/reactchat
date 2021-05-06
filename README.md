<img alt = "Javascript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img alt = "Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img alt = "React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img alt = "AWS" src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
<img alt = "GraphQL" src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
<img alt = "CSS" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" />

# 2-Way Basic Chat

---

Basic 2-Way Chat System made with React. Utilizes GraphQL to connect to DynamoDB on AWS with Amplify. Allows users to select between 2 users, Jupiter and Earth.

## How it Works?

React loads up the UI which begins with the user selecting between the 2 Authors (Jupiter and Earth). Using a query call, we load the database of all messages into React and display them. Users can add new messages which is sent as mutation (via GraphQL) to add to the database. This message is also added to the message history. Depending on the author selected, that perspective is shown (messages on the right)

### Step 1: Select Your Author

<image alt = "Step 1" src="./screenshots/step1.jpg"/>

<em>Choose Between 2 Authors, Jupiter and Earth</em>

### Step 2: Write A Message

<image alt = "Step 2" src="./screenshots/step2.jpg"/>

<em>Jupiter sends a message to Earth</em>

### Step 3: Message Sent from Jupiter

<image alt = "Step 3" src="./screenshots/step3.jpg"/>

<em>Message appears in Blue, shows Jupiter's perspective</em>

### Step 4: Message Seen from Earth

<image alt = "Step 4" src="./screenshots/step4.jpg"/>

<em>Message appears in Blue, shows Jupiter's perspective</em>

---

<strong>This task is a practice assignment to get familiarized with React and AWS Amplify.</strong>
