const queryString = window.location.search, urlParams = new URLSearchParams(queryString), postId = urlParams.get('id');

async function getPostData() {
    let responsePost, post;

    try {
        responsePost = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
        post = await responsePost.json();
    } catch (e) {
        console.log(e);
        return;
    }

    document.querySelector('.post').innerHTML = `
        <div>
            <div><b>Post id:</b> ${post.id}</div>
            <div><b>Post title:</b> ${post.title}</div>
            <div><b>Post body:</b> ${post.body}</div>
        </div>
    `;

    let responseComments, comments;

    try {
        responseComments = await fetch('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments');
        comments = await responseComments.json();
    } catch (e) {
        console.log(e);
        return;
    }


    let commentsHTML = ``;

    for (const comment of comments) {
        commentsHTML += `
            <div>
                <div><b>Cooment Id:</b> ${comment.id}</div>
                <div><b>Comment name:</b> ${comment.name}</div>
                <div><b>Comment email:</b> ${comment.email}</div>
                <div><b>Comment body:</b> ${comment.body}</div>
                <br>
            </div>
        `;
    }

    document.querySelector('.comments').innerHTML = commentsHTML;
}

getPostData();