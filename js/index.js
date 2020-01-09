document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, {
		inDuration: 800,
		outDuration: 800,
	});
});

// Your web app's Firebase configuration
var config = {
	apiKey: 'AIzaSyBTS-4a_yBDFWSi6kR_eApba9rDx5nsAgQ',
	authDomain: 'basic-175a6.firebaseapp.com',
	databaseURL: 'https://basic-175a6.firebaseio.com',
	projectId: 'basic-175a6',
	storageBucket: 'basic-175a6.appspot.com',
	messagingSenderId: '904541940451',
	appId: '1:904541940451:web:cf299d44c03ad07f8573d6',
	measurementId: 'G-E79KC4789W',
};
firebase.initializeApp(config);

// Check to see if you are logged in
firebase.auth().onAuthStateChanged(function(user) {
	if (user == null) {
		document.getElementById('uid').innerHTML = 'not logged in';
		document.getElementById('uid1').src = '';
		return;
	} else {
		userId = user.displayName; // you can also get .displayName, .photoURL, .email
		document.getElementById('uid').innerHTML = userId; // display Google uid on page
		userId1 = user.photoURL;

		//test1=src="https://lh3.googleusercontent.com/a-/AAuE7mBF97GVNtuUz7vkL5WdGqjv6VuPNNEG3L0AAE2s"
		document.getElementById('uid1').src = user.photoURL;
	} // end user null check
}); // end check auth state

// HERE IS THE FUNCTION TO SHOW HOW TO GET USER DATA
function getData() {
	var userId = document.getElementById('uid').innerHTML;
	firebase
		.database()
		.ref('/tweets/' + userId)
		.once('value', function(snapshot) {
			console.log(snapshot.val());
		});
}

// HERE IS THE FUNCTION TO SHOW HOW TO SET/OVERWRITE USER DATA
function setData() {
	var userId = document.getElementById('uid').innerHTML;
	var js_time = Date.now();
	firebase
		.database()
		.ref('/tweets/' + userId)
		.set({ tweet: 'Set over-writes', time: js_time });
}

// HERE IS THE FUNCTION TO SHOW HOW TO SET/OVERWRITE USER DATA
function updateData() {
	var userId = document.getElementById('uid').innerHTML;
	firebase
		.database()
		.ref('/tweets/' + userId)
		.update({
			tweet: 'Update replaces data, but will leave non replaced data as is',
		});
}

// HERE IS THE FUNCTION TO SHOW HOW TO PUSH/ADD NEW USER DATA TO EXISTING DATABASE
function pushData() {
	var userId = document.getElementById('uid').innerHTML;
	var js_time = Date.now();
	var tweetid = firebase
		.database()
		.ref('tweets/' + userId + '/')
		.push({
			tweet: 'push adds to the nodes, a unique key/timestamp is also added',
			time: js_time,
		});
}
// HERE IS THE FUNCTION TO SHOW HOW TO REMOVE USER DATA FROM EXISTING DATABASE - BE CAREFUL!
function removeData() {
	var tweetid = firebase
		.database()
		.ref('tweets/' + userId + '/')
		.remove();
}

function signin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithRedirect(provider)
		.then(function(result) {
			window.location.replace('fbtest.html');
		});
}
function signOut() {
	firebase
		.auth()
		.signOut()
		.then(function() {
			// Sign-out successful.
		})
		.catch(function(error) {
			// An error happened.
		});
}
