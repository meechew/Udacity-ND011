/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
window.onload = () => {

    const sections = document.getElementsByTagName("section");
    const NavList = document.getElementById("navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
    function inView(e) {
        let bounds = e.getBoundingClientRect();
        return bounds.top >= 0 && bounds.bottom <= (window.innerHeight || document. documentElement.clientHeight);
    }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
    for(let e in sections) {
        if (e === "length") break;
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(sections[e].getAttribute('data-nav')));
        li.style.color = "#000D3C";
        li.setAttribute('data-target', sections[e].id)
// Add class 'active' to section when near top of viewport
    function makeElementActive(ele) {
        inView(document.getElementById(ele.getAttribute('data-target')))?
                ele.classList.add('active') : ele.classList.remove('active');
    }

// Scroll to anchor ID using scrollTO event
    function scrollTo(id) {
        const dest = document.getElementById(id);
        dest.scrollIntoView()
    }

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Scroll to section on link click
        li.addEventListener('click', function () {
            //li.classList.add('active')
            scrollTo(this.getAttribute('data-target'))
        });

// Set sections as active
        window.addEventListener('scroll', function () {
            makeElementActive(li)
        });

// Build menu
        NavList.appendChild(li);
}};