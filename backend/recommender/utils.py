import openai
import csv
from fuzzywuzzy import fuzz
import os
import pickle

def find_closest_data(search_query, threshold=90):
        matches = []

        with open('C:/Users/91788/Desktop/djr/backend/recommender/data/Coursera.csv', 'r') as file:
            reader = csv.DictReader(file)

            for row in reader:
                course_name = row["Course Name"]
                similarity = fuzz.token_set_ratio(search_query, course_name)

                if similarity >= threshold:
                    matches.append(row)
        data = None
        if not matches:
            data = "No matching course found"
        else:
            data = matches
        return data

def rec_func(crs):
    courses_list = pickle.load(
        open('C:/Users/91788/Desktop/djr/backend/recommender/data/courses.pkl', 'rb'))
    similarity = pickle.load(
        open('C:/Users/91788/Desktop/djr/backend/recommender/data/similarity.pkl', 'rb'))
    print(courses_list[courses_list['course_name'] == crs])
    index = courses_list[courses_list['course_name'] == crs].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_course_names = []
    for i in distances[1:7]:
        course_name = courses_list.iloc[i[0]].course_name
        recommended_course_names.append(course_name)

    return recommended_course_names

def chat(crs, level):
    openai.api_key = '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'
    #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

    # Define the chat-based conversation
    conversation = [
        {"role": "system", "content": "give me an "+level +
            "road map for learning "+crs+", in 100 words just points"},
    ]

    # Generate a response from the model using the Ada engine
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,

    )

    # Extract the assistant's reply from the response
    reply = response.choices[0].message.content
    return reply



def course_data_from_csv(csr_list):
    matches = []
    with open('C:/Users/91788/Desktop/djr/backend/recommender/data/Coursera.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Course Name"] in csr_list:
                    matches.append(row)

    return matches

