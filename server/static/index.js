document.addEventListener('DOMContentLoaded', function () {

    let counter = 0;
    const quantity = 10;

    // Load posts
    // console.log(counter, quantity);


    if (document.querySelector('.form-submit')) {
        document.querySelector('.form-submit').addEventListener('click', submitForm);
    }

});

function submitForm(elem) {
    let data = {};
    const form = elem.target.parentElement  // document.querySelector('#form');
    form.querySelectorAll('input').forEach((inputField) => {
        data[inputField.name] = inputField.value;
    })

    const formName = form.name
    fetch(`/api/${formName}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => console.log(result))
    return false;
}

// function remove_post(elem) {
//     fetch('/removepost', {
//         method: 'POST',
//         body: JSON.stringify({
//             pid: elem.dataset.pk,
//         })
//     })
//         .then(response => response.json())
//         .then(result => {
//             // Print results
//             console.log(result);
//         })
//     location.reload();
// }

// function load(counter, quantity) {
//     // Set start and end post numbers, and update counter
//     const start = counter;
//     const end = start + quantity;
//     counter = end;

//     var last;

//     fetch(`/following?start=${start}&end=${end}`)
//         .then(response => response.json())
//         .then(data => {
//             last = data.last;
//             if (last == -1) { // no post
//                 const post = document.createElement('div');
//                 post.style = 'margin:10px; border:1px solid gray; padding:10px';
//                 post.className = 'post';
//                 post.innerHTML = '<strong>You have not followed anyone.</strong>'
//                 document.querySelector('#all_posts').append(post);
//             }
//             else {
//                 data.body.forEach(item => add_post(item, counter, quantity));
//                 addAllListeners();
//             }

//         })
//         .then(() => {
//             add_navi_buttons(counter, quantity, last);
//         })
// }

// function load_back(counter, quantity) {
//     // Set start and end post numbers, and update counter
//     const end = counter - quantity;
//     const start = end - quantity;
//     counter = end;

//     var last;

//     fetch(`/following?start=${start}&end=${end}`)
//         .then(response => response.json())
//         .then(data => {
//             last = data.last;
//             data.body.forEach(item => add_post(item, counter, quantity));
//             addAllListeners();
//         })
//         .then(() => {
//             add_navi_buttons(counter, quantity, last);
//         })
// }

// function add_navi_buttons(counter, quantity, last) {
//     const prev = document.createElement('button');
//     prev.className = 'navi-button';
//     prev.style = 'margin:10px; border:1px solid gray; padding:10px';
//     prev.onclick = function () {
//         back(counter, quantity);
//     }
//     prev.textContent = 'Previous';

//     const next_p = document.createElement('button');
//     next_p.className = 'navi-button';
//     next_p.style = 'margin:10px; border:1px solid gray; padding:10px';
//     next_p.onclick = function () {
//         next(counter, quantity);
//     }
//     next_p.textContent = 'Next';
//     //console.log(last - counter);

//     if (counter - quantity != 0) {
//         document.querySelector('#navi').append(prev);
//     }
//     if (last - counter > 0) {
//         document.querySelector('#navi').append(next_p);
//     }
// }

// function add_post(content, counter, quantity) {
//     // Create new post
//     const post = document.createElement('div');
//     post.style = 'margin:10px; border:1px solid gray; padding:10px';
//     post.className = 'post';

//     const post_body = document.createElement('div');
//     post_body.className = 'post-body';
//     post_body.dataset.pk = `${content.id}`;


//     var a = document.createElement('a');
//     a.style = 'color:black;font-size:20px';
//     //a.href = "{% url 'profile' item.creator %}";
//     a.href = `/user/${content.creator}`;
//     a.innerHTML = `<strong>${content.creator}</strong></br>`;

//     var b = document.createElement('a');
//     b.href = '#void';
//     b.className = 'edit_post';
//     b.textContent = 'Edit Post';

//     var c = document.createElement('p');
//     c.className = 'content';
//     c.textContent = content.content;

//     var d = document.createElement('p');
//     d.textContent = content.timestamp;

//     post_body.appendChild(a);
//     post_body.appendChild(b);
//     post_body.appendChild(c);
//     post_body.appendChild(d);

//     var k = document.createElement('input');
//     k.className = 'like-button';
//     k.style = "vertical-align: middle;";
//     k.type = 'image';
//     k.height = '20';
//     k.width = '20';
//     k.dataset.pk = `${content.id}`;
//     if (content.liked) {
//         k.src = '/static/network/liked.jpg';
//         k.alt = 'Unlike';
//         k.dataset.cmd = 'Unlike';
//     }
//     else {
//         k.src = '/static/network/like-1.jpg';
//         k.alt = 'Like';
//         k.dataset.cmd = 'Like';
//     }


//     var l = document.createElement('p');
//     l.className = 'like_count';
//     l.style = "display:inline; padding:5px;";
//     l.textContent = `${content.count}`;

//     var m = document.createElement('p');
//     m.textContent = 'Comment';

//     post_body.appendChild(k);
//     post_body.appendChild(l);
//     post_body.appendChild(m);

//     const post_edit = document.createElement('div');
//     post_edit.className = "post-edit";
//     post_edit.style = "display:none";
//     post_edit.dataset.pk = `${content.id}`
//     post_edit.innerHTML = `<textarea id="post-body" rows="5" cols = "100" name="content">${content.content}</textarea></br><input style="margin-right:5px" class="post_submit" type="button" value="Post" class="btn btn-primary"><input class="post_back" type="button" value="Back" class="btn btn-primary">`;

//     //post.innerHTML = '<div style="margin:10px; border:1px solid gray; padding:10px"></div>';
//     post.appendChild(post_body);
//     post.appendChild(post_edit);

//     // Add post to DOM
//     document.querySelector('#all_posts').append(post);
// }

// async function edit_post(item) {
//     var parent_div = item.parentNode.parentNode;

//     verify(parent_div).then(res => {
//         if (res) {
//             parent_div.getElementsByClassName('post-edit')[0].style.display = "block";
//             parent_div.getElementsByClassName('post-body')[0].style.display = "none";
//         }
//         else {
//             alert('Not authorized');
//         }
//     });
// };

// function update_post(item) {
//     var newtext = item.getElementsByTagName('textarea').content.value;
//     //e.preventDefault();

//     verify(item.parentNode).then(res => {
//         if (res) {
//             fetch('/newpost', {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     pid: item.dataset.pk,
//                     body: newtext,
//                 })
//             })
//                 .then(response => response.json())
//                 .then(result => {
//                     // Print results
//                     console.log(result);
//                 })
//             // Update Webpage
//             show_post(item);
//             item.parentNode.querySelector('.content').textContent = newtext;
//         }
//         else {
//             alert('Not authorized');
//         }
//     });
// }

// function show_post(item) {
//     parent_div = item.parentNode;
//     parent_div.querySelector('.post-edit').style.display = "none";
//     parent_div.querySelector('.post-body').style.display = "block";
// }

// function like_button(elem) {
//     //console.log(elem.alt);

//     fetch('/updatelikes', {
//         method: 'PUT',
//         body: JSON.stringify({
//             pid: elem.dataset.pk,
//             command: elem.alt,
//         })
//     })
//         .then(response => response.json())
//         .then(result => {
//             // Print results
//             console.log(result);
//             if (result['message'] == 'Not authorized') {
//                 alert(result['message']);
//             }
//             else {
//                 // Update Webpage
//                 var x = parseInt(elem.parentNode.querySelector('.like_count').textContent);
//                 if (elem.alt == 'Unlike') {
//                     elem.src = '/static/network/like-1.jpg';
//                     elem.alt = 'Like';
//                     elem.parentNode.querySelector('.like_count').textContent = --x;
//                 }
//                 else {
//                     elem.src = '/static/network/liked.jpg';
//                     elem.alt = 'Unlike';
//                     elem.parentNode.querySelector('.like_count').textContent = ++x;
//                 }
//             }
//         })
// }

// function follow(item) {
//     fetch('/follow', {
//         method: 'PUT',
//         body: JSON.stringify({
//             username: item.dataset.user,
//             follow: item.dataset.target,
//             to_follow: item.dataset.follow,
//         })
//     })
//         .then(response => response.json())
//         .then(result => {
//             // Print results
//             console.log(result);
//         })
//     if (item.dataset.follow == 1) {
//         // change to unfollow
//         item.dataset.follow = 0;
//         item.textContent = `Unfollow ${item.dataset.target}`;
//         follower_count = document.querySelector('#follower_count');
//         s = follower_count.textContent.split(' ');
//         s[1] = parseInt(s[1]) + 1;
//         follower_count.textContent = s.join(' ');
//     }
//     else {
//         // change to follow
//         item.dataset.follow = 1;
//         item.textContent = `Follow ${item.dataset.target}`;
//         follower_count = document.querySelector('#follower_count');
//         s = follower_count.textContent.split(' ');
//         s[1] = parseInt(s[1]) - 1;
//         follower_count.textContent = s.join(' ');
//     }
// }

// function addAllListeners() {
//     document.querySelectorAll('.edit_post').forEach(item => {
//         item.addEventListener('click', function () {
//             edit_post(item);
//         });
//     });

//     document.querySelectorAll('.post_submit').forEach(item => {
//         item.addEventListener('click', function () {
//             update_post(item.parentNode);
//         });
//     });

//     document.querySelectorAll('.post_back').forEach(item => {
//         item.addEventListener('click', function () {
//             show_post(item.parentNode);
//         });
//     });

//     document.querySelectorAll('.post_remove').forEach(item => {
//         item.addEventListener('click', function () {
//             remove_post(item.parentNode);
//         });
//     });

//     document.querySelectorAll('.like-button').forEach(item => {
//         item.addEventListener('click', function () {
//             like_button(item);
//         });
//     });
// }




// // Navigate to next page of posts
// function next(counter, quantity) {
//     document.querySelectorAll('.post').forEach(post => refresh(post));
//     document.querySelectorAll('.navi-button').forEach(post => refresh(post));
//     load(counter, quantity);
// }

// // Navigate to previous page of posts
// function back(counter, quantity) {
//     document.querySelectorAll('.post').forEach(post => refresh(post));
//     document.querySelectorAll('.navi-button').forEach(post => refresh(post));
//     load_back(counter, quantity);
// }

// function refresh(content) {
//     content.remove();
// }

// async function verify(parent_div) {
//     const resp = await fetch('/verify', {
//         method: 'POST',
//         body: JSON.stringify({
//             user: parent_div.querySelector('a').textContent,
//         })
//     });
//     const result = await resp.json();
//     return result.canEdit;
//     /*
//     return fetch('/verify', {
//         method : 'POST',
//         body : JSON.stringify({
//             user : parent_div.querySelector('a').textContent,
//         })
//     })	
//     .then(response => response.json())
//     .then(result => {
//         return result.canEdit;
//     })*/
// }