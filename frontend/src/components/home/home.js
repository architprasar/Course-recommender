import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { about } from '../../portfolio'
import './home.css';



const LoginOrRegister = ({ setAuth }) => {
  const [reg, setReg] = useState(false)
  const [password, setPassword] = useState()
  const [username, setUsername] = useState();
  useEffect(() => { }, [reg])

  const loginreg = async () => {
    var url;
    if (reg) {
      url = 'http://127.0.0.1:8000/api/register/';

    }
    else {
      url = 'http://127.0.0.1:8000/api/login/';

    }

    const data = {
      "username": username,
      "password": password,
    };


    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      if ("message" in response.data) {
        document.getElementById("err").innerText = response.data.message
        setReg(false)

      }
      else {
        localStorage.setItem("token", response.data.token)
        setAuth(true)
      }

    } catch (error) {
      console.log('Error:', error);
      document.getElementById("err").innerText = error.response.data.error
    }
  };
  return (
    <>
      <div className='about__desc'>
        <input type='text' className='h' placeholder='Username' value={username} onChange={(e) => {
          setUsername(e.target.value)
        }} />
        <input type='password' className='h' placeholder='Password' value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />
      </div>
      <span id="err"></span>
      <div className='about__contact center' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

        <button type='button' className='btn btn--outline' style={{ margin: "0" }}
          onClick={
            () => {
              loginreg()
            }
          }
        >
          {reg ? "Register" : "Login"}
        </button>
        <h5>
          <span className='about__name' style={{ cursor: "pointer" }} onClick={
            () => {

              if (reg) {
                setReg(false)
              }
              else {
                setReg(true)
              }
            }
          }>{!reg ? "Register" : "Login"}</span>
        </h5>
      </div>
    </>
  );

}



const CourseCard = ({ course }) => (
  <Card>
    <CardContent style={{ backgroundColor: "var(--clr-bg)", border: "1px solid var(--clr-primary)" }}>
      <Typography variant="h5" component="div" color="var(--clr-primary)">
        {course["Course Name"]}
      </Typography>
      <Typography variant="subtitle1" color="var(--clr-fg)">
        {course["Course Description"]}
      </Typography>
      <Typography color="var(--clr-fg)" variant="body2">
        <b>Difficulty:</b> {course["Difficulty Level"]}
      </Typography>
      <Typography color="var(--clr-fg)" variant="body2">
        <b>Rating:</b> {course["Course Rating"]}
      </Typography>
      <Typography color="var(--clr-fg)" variant="body2">
        University: {course["University"]}
      </Typography>
      <Typography color="var(--clr-fg)" variant="body3">
        Skills: {course["Skills"]}
      </Typography>
      <a target="_blank" className='btn btn--outline' href={course["Course URL"]} >
        Go to Course
      </a>
    </CardContent>
  </Card>
);


const Home = () => {
  const { name } = about
  const [cname, setCname] = useState();
  const [lvl, setLvl] = useState();
  const [result, setResult] = useState(null);
  const [courses, setCourses] = useState(null);
  const [searchrec, setSearchsec] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && !auth) {
      setAuth(true)
    }
    if (searchrec === null && auth) {
      getSearchRec();
    }
  }, [searchrec, auth])

  const getSearchRec = async () => {

    const url = 'http://127.0.0.1:8000/recommend/searchrec/'; // Replace with your API endpoint


    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      setSearchsec(response.data.data)

    } catch (error) {
    }

  }
  const getData = async () => {
    const url = 'http://127.0.0.1:8000/recommend/roadmap/'; // Replace with your API endpoint

    const data = {
      "crs": cname,
      "lvl": lvl,
    };

    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setResult(response.data.roadmap);
      setCourses(response.data.list)

    } catch (error) {
      console.log('Error:', error.response.data);
    }
  };

  function convertPointsToList(pointsString) {
    // Split the string into individual points using regex
    const pointsArray = pointsString.split(/\d+\.\s/).filter(Boolean);

    // Create an unordered list element
    const list = document.createElement('ul');

    // Iterate over each point
    for (let i = 0; i < pointsArray.length; i++) {
      // Create a list item element for each point
      const listItem = document.createElement('li');

      // Create a text node with the point content
      const text = document.createTextNode((i + 1) + '. ' + pointsArray[i]);

      // Append the text node to the list item
      listItem.appendChild(text);

      // Append the list item to the unordered list
      list.appendChild(listItem);
    }

    // Return the constructed unordered list
    var rslt = document.getElementById('result_box')
    rslt.appendChild(list);
  }


  return (
    <div className='about center'>
      <h2>
        Personalized learning path <span className='about__name'>{"and course recommender"}.</span>
      </h2>
      {name && (
        <h3>
          <span className='about__name'>{name}.</span>
        </h3>
      )}

      {auth ? result === null ? <>
        <div className='about__desc'>
          <input type='text' className='h' placeholder='What you want to learn...' value={cname} onChange={(e) => {
            setCname(e.target.value)
          }} />
          <select type='text' className='hh' placeholder='level' onChange={(e) => {
            setLvl(e.target.value)
            console.log(e.target.value)
          }}  >
            <option value="" selected disabled>Your Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Conversant">Conversant </option>
          </select>
        </div>

        <div className='about__contact center'>

          <button type='button' className='btn btn--outline'
            onClick={
              () => {
                getData()
              }
            }
          >
            Recommend
          </button>

        </div>
      </> : "" : <LoginOrRegister setAuth={setAuth} />}
      <p className='about__desc' id="result_box">{result === null ? "Discover a world of learning and skill development with our curated courses and expertly designed roadmaps. Our tool simplifies the process, recommending personalized courses based on your interests and goals. Stay motivated and focused as you progress through a well-structured roadmap, tailored to your needs. Start your journey today and unlock your full potential with our invaluable resources."

        : <><h4>Here is your RoadMap to {cname}</h4>{convertPointsToList(result)}</>}</p>

      {auth ? courses !== null ? typeof courses === "object" ? <><Box display="flex" style={{ marginTop: '100px' }} flexDirection="column" gap={2}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </Box> </> : <h3 style={{ marginTop: "100px" }}>
        <span className='about__name'>{courses}.</span>
      </h3> : searchrec !== null ? <><Box display="flex" style={{ marginTop: '10px' }} flexDirection="column" gap={2}>
        <h3 style={{ marginTop: "10px" }}>
          <span className='about__name'>Recommendations based on your previous search:</span>
        </h3>
        {searchrec.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </Box> </> : "" : ""}
    </div>
  )
}

export default Home
