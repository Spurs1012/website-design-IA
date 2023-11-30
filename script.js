let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const svgPaths = document.querySelectorAll(".logo-container svg path");

    const setSvgColor = (color) => {
        svgPaths.forEach(path => path.style.fill = color);
    };

    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > 0) {
        navbar.classList.add('scrolled');
        navbar.style.top = '0';
        navbar.classList.add('white-bg');
        navbar.classList.add('black-text');
        navbar.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        setSvgColor("#000");
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('white-bg');
        navbar.classList.remove('black-text');
        navbar.style.boxShadow = "none";
        setSvgColor("#fff");
    }

    if (st > lastScrollTop && st > navbar.offsetHeight) {
        navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    lastScrollTop = st <= 0 ? 0 : st;
});

document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const slideMenu = document.getElementById('slide-menu');
    const slideMenuContent = document.getElementById('slide-menu-content');
    const slideMenuHeader = document.getElementById('slide-menu-header');
    const closeMenuButton = document.getElementById('close-menu');
    const menuDescriptionTitle = document.getElementById('menu-description-title');
    const menuDescriptionText = document.getElementById('menu-description-text');
	const exploreButton = document.getElementById('explore-button');

    const contentMapping = {
        "Overview": ["Introduction", "Name", "History", "Women's association football"],
        "Fundamentals": ["Gameplay", "Laws"],
        "Equipment and Field": ["Players, equipment, and officials", "Ball", "Pitch"],
        "Match Dynamics": ["90-minute ordinary time", "Tie-breaking", "Ball in and out of play"],
        "Misconduct": ["On-field", "Off-field"],
        "Competitions": ["Governing bodies", "International competitions", "Domestic competitions"],
        "Resources": ["See also", "Notes", "References"],
        "Outreach": ["External links"]
    };

    const descriptionMapping = {
        "Name": "Football, known as soccer in some countries, evolved from ancient ball games. The term soccer comes from Oxford -er slang, initially assoccer, and was shortened over time. The name varies globally, often due to the popularity of other football codes.",
		"Introduction": "Soccer, or association football, is a global sport involving two teams of 11 players each trying to score goals, and is governed by FIFA. Major tournaments include the FIFA World Cup and UEFA Champions League.",
		"History": "Football, evolved from ancient games, is the world's predominant sport, with a rich history from 19th-century England to the global impact of the FIFA World Cup.",
		"Women's association football": "Women's football, having faced historical suppression, has gained global popularity and recognition since the late 20th century, highlighted by the FIFA Women's World Cup, but still faces challenges related to equity.",
		"Gameplay": "Football involves two teams aiming to score goals by moving a ball into the opponent's net, while adhering to rules and employing strategic player positions.",
		"Laws": "Football is universally governed by the 17 Laws of the Game, maintained by the IFAB and published by FIFA, with possible modifications for specific groups.",
		"Players, equipment, and officials": "Football games feature two teams of 11 players, using regulated equipment and playing in designated positions, overseen by referees and sometimes assisted by technology like VAR.",
		"Ball": "A football is a synthetic, spherical ball with a circumference of 68-70 cm and a weight of 410-450 g, though historically was made of different materials like leather and latex.",
		"Pitch": "Football pitches, rectangular in shape and ranging in size, feature specific markings like penalty areas and standardized goals as defined by the Laws of the Game.",
		"90-minute ordinary time": "Football matches typically consist of two 45-minute halves, a 15-minute halftime break, and potential additional stoppage time for delays.",
		"Tie-breaking": "Tie-breaking in knockout football games can involve extra time or penalties; in two-legged matches, aggregate scores and away goals might be considered.",
		"Ball in and out of play": "Football classifies the ball as either in play or out of play, with various methods for restarting play, each governed by specific rules and contexts.",
		"On-field": "Fouls and misconduct in football are penalized through various means like free kicks or cards, with referees having the authority to allow play to continue for advantage or stop it.",
		"Off-field": "Football associations govern off-field conduct, administering sanctions for issues like doping and match-fixing, which may involve penalties like fines or suspensions.",
		"Governing bodies": "FIFA, with its headquarters in Switzerland, is the international governing body of football, affiliated with six regional confederations and 211 national associations, and works with the IFAB on establishing the Laws of the Game.",
		"International competitions": "The FIFA World Cup represents the pinnacle of international football, while continental championships and international club competitions like the UEFA Champions League also hold significant prestige.",
		"Domestic competitions": "Football leagues typically involve seasonal play, with teams earning points to determine champions, promotion, and relegation, and parallelly, various domestic and international cup competitions are held.",
		"See also": "",
    	"Notes": "",
		"References": "",
    	"External links": ""
    };

    const emptyCategories = ["See also", "Notes", "References", "External links"];

	const clickableEntries = {
		"90-minute ordinary time": "match_Dynamic.html",
		"Tie-breaking": "match_Dynamic.html",
		"Ball in and out of play": "match_Dynamic.html"
	};

	const showMenu = (header, items) => {
		slideMenuHeader.textContent = header;
		slideMenuContent.innerHTML = items.map(item => `<div>${item}</div>`).join('');

		if (header === "Resources" || header === "Outreach") {
			menuDescriptionTitle.textContent = "";
			menuDescriptionText.textContent = "";
			exploreButton.style.display = 'none';  // Hide the button
		} else {
			const defaultItem = items[0];
			menuDescriptionTitle.textContent = defaultItem;
			menuDescriptionText.textContent = descriptionMapping[defaultItem] || "";

			if (Object.keys(clickableEntries).includes(defaultItem)) {
				exploreButton.href = clickableEntries[defaultItem];  // Set the link of the button
				exploreButton.style.display = 'block';  // Show the button
				exploreButton.disabled = false;  // Make sure it's clickable
			} else {
				exploreButton.style.display = 'block';  // Show the button but...
				exploreButton.disabled = true;  // ...make it non-clickable
				exploreButton.removeAttribute('href');  // Remove the link attribute
			}
		}

		slideMenu.style.left = '0';
		body.style.overflow = 'hidden';

		applyHoverEffect();
	};

    const hideMenu = () => {
        slideMenu.style.left = '-100%';
        body.style.overflow = '';
    };

    const updateRightMenu = (content) => {
        if (emptyCategories.includes(content)) {
            menuDescriptionTitle.textContent = "";
            menuDescriptionText.textContent = "";
        } else {
            menuDescriptionTitle.textContent = content;
            menuDescriptionText.textContent = descriptionMapping[content] || "";
        }
    };

    const applyHoverEffect = () => {
        const menuDivs = document.querySelectorAll('#slide-menu-content div');
        menuDivs.forEach(div => {
            div.addEventListener('mouseover', function() {
                menuDivs.forEach(d => d.style.textDecoration = 'none');
                div.style.textDecoration = 'underline';
                updateRightMenu(div.textContent.trim());
            });
        });
    };

    document.querySelectorAll('.nav-links-right li, .nav-links-left li').forEach(link => {
		link.addEventListener('click', () => {
			const header = link.textContent.trim();
			const items = contentMapping[header] || [];
			showMenu(header, items);
		});
	});

	closeMenuButton.addEventListener('click', hideMenu);

});

document.addEventListener("DOMContentLoaded", function() {
    const categories = document.querySelectorAll(".more-categories li");
    const contents = document.querySelectorAll(".match-dynamic-categories, .fundamental-categories, .equipment-and-field-categories, .player-conduct-categories");

    categories.forEach(category => {
        category.addEventListener("click", function() {
            categories.forEach(cat => {
                cat.classList.remove("active");
            });

            contents.forEach(content => {
                content.style.display = "none";
            });

            const targetId = category.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = "block";
            }

            category.classList.add("active");
        });
    });
});

$(document).ready(function() {
    $("#other-categories-nav").hide();
    $(".match-dynamic-categories").hide();

    $("#other-categories-btn").click(function() {
        $("#other-categories-nav").fadeToggle("fast", "linear");
    });

    $(".match-dynamic-nav a").click(function() {
        let selectedCat = $(this).data('cat');
        $(".match-dynamic-categories").hide();
        $("#" + selectedCat).fadeIn();
    });

    const categoryMapping = {
        'Fundamental': 'fundamental-categories',
    };

    $('.other-categories-nav a').click(function(e) {
        e.preventDefault();
        const clickedCategory = $(this).text().trim();

        const targetCategoryID = categoryMapping[clickedCategory];

        if (targetCategoryID) {
            const categoryContent = $(`#${targetCategoryID}`).html();

            $('#match-dynamic-categories').html(categoryContent);
        }
    });
});