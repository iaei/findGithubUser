$(function() {

    let data = {
        client_id: '315ec3253a7eadf68ef4',
        client_secret: '4726d3ce6ee02d3061e6af3712f4243e7f2d73cc',
    };

    $userInput = $('.input');
    let timer;
    $userInput.on('keyup', function() {
        clearTimeout(timer);

        if ($userInput.val().length === 0) {
        	clear();
            return;
        }

        timer = setTimeout(function() {

            $.ajax({
                url: `https://api.github.com/users/${$userInput.val()}`,
                data,
                error:() => {clear();console.log('UserNotFound')},
            }).then(function(user) {
                showIntro(user);
            })

            $.ajax({
                url: `https://api.github.com/users/${$userInput.val()}/repos`,
                data,
                error:() => {clear();console.log('UserNotFound')},
            }).then(function(repos) {
                showRepos(repos);
            })
        }, 300);

    });

    function clear(){
    	$('.intro').html('');
    	 $('.responsity').html('');
    }

    function showIntro(user) {
        let intro =
        `
			<article class="media">
                <figure class="media-left">
                    <p class="image is-100x100">
                        <img src=${user.avatar_url}>
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                    	<p>
            				<strong>${user.login}</strong> <small>creat at</small> <small>${user.created_at}</small>
            				<br>${user.bio}
       					 </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" target="_blank" href=${user.html_url}>
                      <span class="icon is-small">
                        <i class="octicon octicon-mark-github"></i>
                      </span>
                  </a>
                        </div>
                    </nav>
                </div>
            </article>
		`
        $('.intro').html(intro);
    };

    function showRepos(repos) {
        repos.sort(function(a, b) {
            return b["stargazers_count"] - a["stargazers_count"];
        });

        let reposHtml = repos.map(function(repo) {
            return `<a class="panel-block" href=${repo.clone_url} target="_blank">
          		<div class="repoName">
	          		<span class="panel-icon">
	              		<i class="octicon octicon-repo"></i>
	          		</span>
	          		${repo.name}
          		</div>
          		<div class="star">
          			<i class="octicon octicon-star"> ${repo['stargazers_count']}</i>
          		</div>
        	</a>
    		`
        }).join('');

        $('.responsity').html(
        	` <nav class="panel">
                <p class="panel-heading">
                    repositories
                </p>
                <!-- <div class="repos"></div> -->
            </nav>`+reposHtml);

    }



});