# Course Recommendation System

## Overview

The Course Recommendation System is a project that leverages Coursera course data and a fine-tuned GPT-3 model to provide personalized course recommendations and learning roadmaps. Additionally, it uses cosine similarity to recommend further courses based on a user's past interests and preferences.

## Features

- **Course Recommendations:** The system offers personalized course recommendations based on a user's profile and interests, enhancing their learning journey on Coursera.

- **Learning Roadmaps:** Users can receive customized learning roadmaps that guide them through a structured learning path, ensuring they acquire the necessary skills and knowledge.

- **Cosine Similarity:** The system utilizes cosine similarity to suggest additional courses that align with a user's historical course selections and preferences, fostering continuous learning and skill development.

## Technologies Used

- **Python:** The core programming language for developing the recommendation system.

- **GPT-3:** A fine-tuned GPT-3 model is used for natural language processing and generating personalized recommendations and roadmaps.

- **Coursera Dataset:** Real-world course data from Coursera is used to create a robust recommendation engine.

## How to Use

1. **Clone the Repository:**

2. **Install Dependencies:**
```bash
cd backend

pip install -r requirements.txt

cd ../frontend

npm install
```
3. **Run the Application:**

use the fronted folder to run the ReactJs frontend
```bash
npm start
```
use the backend folder to run Django backend
```bash
python manage.py runserver
```

4. **Access the System:**

Open your web browser and navigate to `http://localhost:5000` to use the Course Recommendation System.

## Contributing

Contributions are welcome! If you'd like to enhance the system or fix any issues, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them.

4. Push your changes to your forked repository.

5. Create a pull request to merge your changes into the main project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to express our gratitude to Coursera for providing access to their course data, and to the OpenAI team for their GPT-3 model, which powers the personalized recommendations in this system.

---

Enjoy your learning journey with the Course Recommendation System! If you have any questions or feedback, please feel free to reach out to us.

