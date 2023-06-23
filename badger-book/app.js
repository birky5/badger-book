/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */
fetch('https://cs571.org/s23/hw3/api/students', {
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_1c5bcd34828a97342b93"
	}
})
.then(response => response.json())
.then(data => {
	console.log(data); // array of students
	document.getElementById("students").innerHTML = buildStudentsHtml(data);

	let btn = document.getElementById("search-btn");
	let reset_btn = document.getElementById("reset-search-btn");
	btn.addEventListener("click", function() {
		//console.log("NAME to search: " + name + "MAJOR to search: " + major + "INTEREST to search: " + interest);
		let major = document.getElementById("search-major").value.toLowerCase().trim();
		let interest = document.getElementById("search-interest").value.toLowerCase().trim();
		let name = document.getElementById("search-name").value.toLowerCase().trim().split(" ");
		let first_name = name[0];
		let last_name = name[1];

		let i = 0;
		let filteredArray = [];
		data.forEach(element => {
			if (((data[i].name.first.toLowerCase().includes(first_name) && data[i].name.last.toLowerCase().includes(last_name)) ||
					(data[i].name.first.toLowerCase().includes(first_name) && name[1] === undefined) || (data[i].name.last.toLowerCase().includes(first_name) && name[1] === undefined)) &&
					data[i].major.toLowerCase().includes(major) && (data[i].interests.filter(stud_interests => stud_interests.toLowerCase().includes(interest)).length > 0)) {
				// The worst if statement anyone ever could come up with...
				// If the student meets all requirements then it gets pushed onto the filtered array
				// Last one is, if the length of the filtered array is greater than 0, then that
				// substring is in one of the interests
				filteredArray.push(data[i]);
			}
			i++;
		});

		// Print out the filtered things
		document.getElementById("students").innerHTML = buildStudentsHtml(filteredArray);
	});

	reset_btn.addEventListener("click", function() {
		// Reset to show all students again and clear the input fields
		document.getElementById("students").innerHTML = buildStudentsHtml(data);
		document.getElementById("search-major").value = '';
		document.getElementById("search-interest").value = '';
		document.getElementById("search-name").value = '';
	});
})
.catch(error => console.error(error));

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h5>${stud.major}</h3>`;

	if (stud.fromWisconsin) {
		html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and is from Wisconsin.</p>`;
	} else {
		html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and is NOT from Wisconsin.</p>`;
	}

	html += `<p>They have ${stud.interests.length} interests including...</p>`;
	html += `<ul>`;
	for (let i = 0; i < stud.interests.length; i++) {
		html += `<li>${stud.interests[i]}</li>`;
	}
	html += `</ul>`

	html += `</div>`
	return html;
}
