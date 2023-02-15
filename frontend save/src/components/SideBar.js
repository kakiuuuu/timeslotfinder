import React from 'react';
const Sidebar = () => {

  return (
    <div className='flex'>
      <ul className>
        <li className="nav-item">
          <a href="/" className="nav-link active" aria-current="page">
            {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlinHref="#home"/></svg> */}
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/gallery" className="nav-link text-white">
            {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg> */}
            Dashboard
          </a>
        </li>
        <li>
          <a href="/slideshow" className="nav-link text-white">
            {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"/></svg> */}
            Orders
          </a>
        </li>
      </ul>
      <div>
        {/* <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

        </a> */}

        {/* <Dropdown.Toggle variant="success" id="dropdown-basic">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Sign out</Dropdown.Item>
        </Dropdown.Menu> */}
      </div>
    </div>
  )
}

export default Sidebar;
