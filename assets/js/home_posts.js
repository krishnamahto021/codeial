{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(` .delete-post-button`,newPost)); //the object newPost is in the class .delete-post-button and we left a space " " before the delete-post-button
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    // to view post in  DOM
    let newPostDom = function(post){
        return $(`    <li id="post-${post._id}">
        <p>
            ${ post.content }
            ${ post.user.name}
        </p>
    
            <small>
                <a class ='delete-post-button' href="/posts/destroy/${post._id}">X</a>
            </small>

    
    
                <div class="post-comments">

                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type your comment...">
                            <!-- to link user to post -->
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>

    
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                </ul>
    
                            </div>
    
    
                </div>
    </li> 
    `)
    }


    // delete a post via ajax
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();
}