import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom'
import NotFound from './NotFound'
import LoginForm from './LoginForm'
import SignForm from './SignForm'
import MainMenu from '../ui/menu'
import HomeFeed from './HomeFeed'
import Profile from './Profile'
import About from './About'
import {ToastConsumer, ToastProvider, withToastManager} from 'react-toast-notifications'

class BaseLayout extends Component {

  logout_handler(){
    this.props.logout(()=>{
      this.props.toastManager.add("You've been logged out.", { appearance: 'error' })
    })

  }


  render () {
    const { auth: { isAuthenticated, token } } = this.props

    console.log(this.props)
    let { PrivateRoute, logout } = this.props

    return (
      <ToastProvider>
      <div className='container-fluid p-0'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className='hello nav-link' to='/home'>
                Codex Camp
              </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <a className="nav-link hello" href="#">IDE section <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        { (!isAuthenticated & !token) || (!isAuthenticated || !token) ? <NavLink className='hello nav-link' to='/login'>Login</NavLink>
                : <a onClick={this.logout_handler.bind(this)} className='hello nav-link'>
                  Log Out</a>
              }
      </li>
      <li className="nav-item">
        <NavLink className='hello nav-link' to='/about/'>
                About Me
              </NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link hello" href="#">Upgrade</a>
      </li>
      <li className="nav-item dropdown">
      { (!isAuthenticated & !token) || (!isAuthenticated || !token) ? ''
                : <div className='d-inline'><a className="nav-link hello dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Notifications
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div></div>
              }
        
      </li>
    </ul>
  </div>
</nav>
        <div className='content'>
          <Switch>
            <Route exact path='/home' component={HomeFeed} />
            <Route exact path='/user/profile' component={Profile}/>
            <Route exact path='/about/' component={About} />
            <Route exact path='/signup' component={SignForm} />
            <Route path='/login' component={LoginForm} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <footer className="pt-5">
    <nav className="bg-dark navbar-light">
      <div className="container py-2">
        <div className="text-center text-white">
          <p>All Rights Reserved..</p>
          <p>Created by Ibaakee Ledum (Developer @<strong>Froxine Online Store</strong>)</p>
          <div>
            <p>Reach Us at <strong> 09029632002 or ledumibaakee@gmail.com</strong></p>
          
          </div>
        </div>
      </div>
    </nav>
  </footer>
      </div></ToastProvider>)
  }
}

export default withToastManager(BaseLayout)
