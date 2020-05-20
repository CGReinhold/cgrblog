function onReady() {
  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if (document.getElementsByClassName("post").length) {
    var menu = document.getElementById("menu");
    var nav = document.getElementById("nav");
    var menuIcon = document.querySelectorAll("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if (document.body.clientWidth >= 1440) {
      menu.style.visibility = "visible";
      menuIcon.forEach(i => i.className = "active");
    } else {
      if (menu) {
        menu.style.visibility = "hidden";
      }
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.forEach(i => i.addEventListener("click", function() {
      if (menu.style.visibility === "visible") {
        menu.style.visibility = "hidden";
        menuIcon.forEach(i => i.className = "");
      } else {
        menu.style.visibility = "visible";
        menuIcon.forEach(i => i.className = "active");
      }
      return false;
    }));

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu) {
      window.addEventListener("scroll", function() {
        const getOffset = element => {
            if (!element.getClientRects().length)
            {
              return { top: 0, left: 0 };
            }

            let rect = element.getBoundingClientRect();
            let win = element.ownerDocument.defaultView;
            return (
            {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            });   
        }
        var topDistance = getOffset(menu).top;

        // hide only the navigation links on desktop
        if (nav.style.display === "none" && topDistance < 50) {
          nav.style.display = "";
        } else if (nav.style.display !== "none" && topDistance > 100) {
          nav.style.display = "none";
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        const menuIconVisible = document.getElementById("menu-icon").offsetParent;
        if (!menuIconVisible) {
          if (topDistance < 50 ) {
            document.getElementById("menu-icon-tablet").style.display = "";
          } else {
            document.getElementById("menu-icon-tablet").style.display = "none";
          }
        }
      });
    }
  }
};

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(onReady);