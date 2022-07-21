// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
          extraLarge
      }
      type
      status
      season
      seasonYear
      format
      episodes
      genres
      rankings {
        rank
      }
      countryOfOrigin
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      averageScore
      popularity
      chapters
      volumes
      description
      synonyms
      characters(page: 1, perPage: 6) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          node { # The character data node
            id
            name {
              first
              last
            }
          }
          role
          voiceActors (language: JAPANESE) { # Array of voice actors of this character for the anime
            id
            name {
              first
              last
            }
          }
        }
      }
      reviews(page: 1, perPage: 6) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          node {
            user {
              name
              avatar {
                large
              }
            }
            rating
            score
            summary
          }
        }
      }
      relations {
        edges {
          node {
            title {
              english
            }
            id
            type
          }
        }
      }
    }
  }
}
`;

// "Yuukaku-hen"

// Define our query variables and values that will be used in the query request
var variables = {
    search: "nisekoi",
    page: 1,
    perPage: 10,
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}