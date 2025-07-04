The GOAL of this project is to become proficient with Class components, Routing, Data Fetching and Testing in React, master styled-components for styling react components and master React itself. This project is the Mother lode, the Holy grail, the Magnum Opus, Go all out!

1.  Ideas • Get inspiration from multiple gaming stores online

    i) Homepage will be god of war themed

    ii) The logo will have blades of chaos and maybe the logo of the game itself including the font.

    iii) Maybe you can even add fire transition or something like that when switching from one page to another.

    iv) The name of the store will be Game Legion

<br>

2.  What are the components I need for this project?

    i) A HomePage Component which is the Home of the store itself

    ii) Sidebar Component which contains all the navigation links

    iii) Shop component which is the Shop page of the store

    iv) GameCard component for the cards that display the games

    v) Cart component for when an item is added to the cart

    vi) Header component which contains a search bar, logo, cart and wishlist

    vii) GamePage component which is the full page for a game including its pictures and other information.

    viii) For the remaining links in the navbar, you have to decide if clicking on them will sort the items in the shop page or if it will take you to a completely new page.

        viii.a. How would you accomplish the sorting behavior? I would probably use a context hook. Make it so that if it is set to any particular sorting indicator like "PlayStation" or "PC", then the games on the Shop page will only show those particular games

        viii.b. How would I accomplish the new page behavior? You'd have to create a new component for sorting behavior possible and configure the route to lead to that component if that component gets clicked. But you know, this might re-fetch the image data for the games and that might make everything load again. The sorting would be better if it occurred in an instant. Yeah I agree but this is still an option.

3.  HOMEPAGE Component:

    3.1. JSX:

        3.1.1. Header

            i) Header component's JSX will be at the Top of the page.


        3.1.2. Quick Navigation – Make it a component

            i) It will contain multiple options each leading to a different subcategory of games

            ii) I’m feeling lucky with a dice icon – Will lead to a random game

            iii) Last 30 days – Will lead to the popular games over the last 30 days

            iv) Popular in 2024 – Will lead to popular games in this year

            v) Best of the year •  Will lead to best games of the year

            vi) All time top – Will lead to top games of all time


        3.1.3. Info

            i) It will contain some generic info about the project

            ii) Link Buttons leading to my repo and the RAWG API

    3.2. LOGIC:

        3.2.1. Quick Navigation

            i) I’m Feeling Lucky:
                • Fetch all the Genres from the API
                • Choose a random genre
                • Fetch games with that genre
                • Out of returned data, choose a random game
                • Retrieve its Id and pass it into the “to” prop of I’m feeling lucky
                • This way you’ll always get a valid gameId
                • For the random genre/game picking, use lodash’s sampleSize func.
                • Create a function for this and this function will return the gameId and you can call it inside the “to” prop.

            ii) Last 30 days, Popular in 2024, Best of the year, All time top:
                • The API should return those particular set of games for each category
                • Then you simply have to display them in the Shop component


        3.2.2. Routing logic:

            i) The <App> component is the root route "/". <Home> is what it renders.

            ii) <Shop> component has the route "/shop".

            iii) Each of the QuickNavigation button will route to /shop, sending the appropriate pageState values with it. Inside Shop, it will mount with the sent pageState value if it exists, otherwise its just null.

            iv) How will you send and receive the data across? Link elements with the state property are just fine. In almost all cases, only data you need to send across are strings like pageStates, IDs and search terms with search bar. So state will suffice. You can't use useParams() hook with class components.

            v) After this point, it all about fetching the data in the appropriate components using the IDs, pageStates and so on. It's not that complicated once you can wrap your mind around it. Every project seems to have this moment where everything just clicks and I know exactly what to do.

    3.3. STYLING:

        3.3.1. Background

            i) It will be a GIF or a video of Kratos doing something that loops seamlessly.

            ii) Maybe, you can use a live Wallpaper, search for something cool


        3.3.2. Header and Quick Navigation:

            i) Handle styling logic inside their own components.


        3.3.3. Theme

        How do I implement both Norse and Greek themes

            i) I need a check box that can switch between the themes

            ii) First create a state theme in App.jsx

            iii) Pass in both the theme & themeSetter inside Home component

            iv) Then using the checkbox, you can switch the themes

            v) Using the theme itself you can switch the styles inside the styled-component

            vi) Worry about getting it to work first before worrying about the look of the checkbox

    3.4. Animations/Transitions:

        i) All the buttons will grow in size on hover
            • Just use scale and transition like before

4.  SHOP Component

    4.1. JSX:

        4.1.1. Header

            i) Header component's JSX will be at the Top of the page.


        4.1.2. Sidebar

            i) Sidebar component's JSX will be at the left-hand side of the page.


        4.1.3. Order By Dropdown

            i) A dropdown with four options – Name, Release date, popularity, Rating


        4.1.4. Collection of Cards

            i) A div that contains all the GameCard components


        4.1.5. Sort By Dropdown

            i) A dropdown with two options – Low to High, High to Low

    4.2. LOGIC:

        4.2.1. pageState

            i) This state controls what the Shop component displays

            ii) Initially its empty or “base” and the component should display random games

            iii) I think I’ll have a total of 40 games display on the page.


        4.2.2. Sidebar links

            i) The Sidebar links should control the games that are being displayed based on their category

            ii) Clicking on one will fetch its appropriate data and set the pageState to its type, like “Last 30 days” will fetch the games popular in the last 30 days and set the pageState to “Last 30 days” and so on for all other links.


        4.2.3. Fetching

            i) Do I fetch each time a navlink is clicked or do I fetch it all at the start so I can have them ready to serve? Well, the there’s a limit of 6 parallel requests that can happen at once in almost all browsers. There’s simply way to many variation with the API calls for me to be able to fetch it all at once, you could maybe use Promise.all() and fetch it one by one, but that might slow down the website drastically. In any case, I think you should stick to a single call at a time that happens when a nav link is clicked, if that feels slow, then maybe its worth considering the ALL-FETCHER strat.


        4.2.4. Loading:

            i) Create a loading state for when the data being fetched not here yet.

            ii) Set that state to false once data gets here but while it is true, play a loading animation.


        4.2.5. cart state:

            i) The Cart component will be part of the JSX returned by the Shop component

            ii) The cart state however will be defined in the App/root component and passed into both HomePage and Shop components as they both will display the cart.

            iii) It’s setter will also be passed in to both the components.

            iv) Here the setter is passed to each of the GameCard components which contain Add to Cart buttons which when pressed will add that Cart item to cart state using its setter. This would be used inside the Cart component to display the item.


        4.2.6. Order by logic:

            i) The GameCards have to be sorted based on their Name, Release date, Popularity, Rating. How?

            ii) You’re gonna have to wait until you see the data returned by the API to figure out the exact logic but for now, I think the state that stores GameCards will be an array and this array will be sorted using each of the options which shouldn’t be too hard to implement.

            Final OrderBy logic:

            i) For popularity, you can sort the games based off the added property. Have this be the default property.

            ii) For release date, release date would do

            iii) For name, just name

            iv) For rating, use the rating prop

            What about the code? It's kinda simple, just use

            myarray.sort((a,b) => b.age – a.age)

            Okay nvm, the API itself offers sorting capability for all these types. I can make use of the same getAPIURL func.

            i) First, create a dropdown for the options

            ii) Create a state orderBy which can take four string values •  “Name”, “Release date”, “Popularity”, “Rating”

            iii) Let the default be “Popularity” and let the dropdown control the OrderBy value

            iv) Have the dropdown visible for each of the navlinks, except for Best of the year, Popular in 2026, All time top as these are depended on Popularity (added) by default.

            v) How would the OrderBy state value change the API URLs?
                • If OrderBy is “Popularity”,  then “&ordering=-added”
                • If OrderBy is “Name”,  then “&ordering=-name”
                • If OrderBy is “Release date”,  then “&ordering=-released”
                • If OrderBy is “Rating”,  then “&ordering=-rating”

            vi) Add the above logic to choose the ordering parameter and add that parameter for all the links/pageStates in the getAPIURL() func, except for the aforementioned three.

            vii) Create a dropdown component for all this.

    4.3. STYLING:

        i) Blackish Grey for the background color

        ii) Grid with 4 columns for the GameCards

        iii) A h1 for the heading of the Shop page for when pageState has a value that’s not the default

    4.4. Animations/Transitions:

        4.4.1. Loading: It has to rotate in a circle

            i) How can I implement this? Simplest way would be to Find one of those SVGs that look like a loading spinner and rotate it from 0deg to 360deg infinitely until loading state eventually becomes false.

            ii) What’s the other way? You could try to implement something unique for the loading animation. I’ll do some research see what I can whip up.


        4.4.2. Page transition: I want to add a transition for when you switch from one page to another.

            i) Forward/Next-Page transition: When the user moves forward in pages order
                • Entire page moves slightly to the right – You can use translate on the page’s component
                • Fades away into nothingness – You can either make the opacity low or add a black color to it

            ii) Backward/Previous-Page transition: When the user moves backward in pages order
                • Entire page moves slightly to the left – Same logic as before
                • Fades away into nothingness – Same logic as before


        4.4.3. Header pop-up/down

        The header has to move up outside the page when the user scrolls down the page and reappear when the user scrolls up the page. How do I implement this?

            i) Create a state isHeaderVisible that controls the header visibility. This state can be used to add a class to the Header component

            ii) Pass the state into the Header component and use it in the className prop in the returned StyledHeader. Or just create the state in the Header itself, there’s no need for Shop component to know about this as you’ll be using

            iii) Inside a componentDidUpdate, listen for a “scroll” event

            iv) Get the scroll position using window.pageYOffset

            v) Compare that value with the previous scroll position. Create a state variable scrollVal for the previous scroll position so it can persist.

            vi) If the latest value is bigger than the previous value, then the user is scrolling down, so update the isHeaderVisible state to false and trigger the header disappearing animation.

            vii) If the latest value is smaller than the previous value, then the user is scrolling up, so update the isHeaderVisible state to true and trigger the header reappearing animation.

            viii) For both animations, set the fill-mode to forwards so the final state persists.

            ix) What about the animation itself? Well, You can move it out of visibility using transform: translate and also apply a position: fixed; to it as well to make it show at all times. Refer to your CV application project for exact styles needed.

5.  Sidebar Component

    5.1. JSX:

        5.1.1. Div to hold all the nav links

            i) A div with a single column for the nav links seperated by categories


        5.1.2. Nav Links

            i) For each link, add an icon and a text naming the category

    5.2. LOGIC:

        5.2.1. pageState Switching

            i) The state setter for the pageState state will be passed in to this component's

            ii) It will set the state based on the category link that was clicked on.


        5.2.2. API Calls

            i) For each category, when they’re clicked you have to make their corresponding API call

            ii) Create a function DataFetcher() to which you can pass in the category name. This function based on the category name will fetch the appropriate data using the link and send that data to the Shop pageState

            iii) You have to decide if you want to do the fetching inside the Sidebar component or the ShopPage component. How would either method play out?
                • Sidebar fetching – You’d fetch inside the sidebar and probably a state defined in Shop component will be passed down into Sidebar inside which you’ll store the newly fetched data.
                • Shop fetching – You’d simply make the Sidebar change the state of the categories and you’d use an useEffect/componentDidUpdate inside Shop which would depend on the pageState so that when it changes, it would trigger re-fetching of the data based on the new value of pageState.

            Final Fetch logic:

            I need to fetch the appropriate games for the appropriate navlinks in the sidebar, how?

            i) First for each navlink, figure out the appropriate API call from the API docs

            ii) Decide on a unique pageState value for each of the nav links, the same name might work just fine.

            iii) Once you're ready, create a function getAPIURL() which will return the appropriate API link for the pageState provided using a switch case statement

            iv) API URLs from documentation:
                • Wishlist: Do it last, there’s no fetching involved with this particular one as the user adds the games to it themselves
                • New Releases:
                    • Last 30 days – Get the current date using new Date() object, install “date-fns” library and using its format method, format the date to the “yyyy-MM-dd” format, then you can filter the games by release date by attaching “dateThatIs30DaysBeforeCurrentDate,currentDate” (for example, “2010-01-01,2018-12-31”) to the API URL with an “&” behind it.

                    • This week – Similar logic for the API URL. The startOfWeek() and endOfWeek() funcs can be used to get the start and end dates of the week the currentDate is in, simply pass in newDate() into them. Once you have those, you can format em into “yyyy-MM-dd” format and use it in the URL.

                    • Next week – Find out the end date using endOfWeek() and then get the next day’s date using the add() method with {days: 2} specified and then feed that date inside startOfWeek() and endOfWeek() methods to get the start and end dates of the next week.

                • Top:

                    • Best of the year – With the currentDate, get the start and end dates of the year by using startOfYear() and endOfYear() methods from “date-fns” and then feed those dates into the URL in the format, and then filter by “added”

                    • Popular in 2026 – First, add a year to the currentDate using addYears() method, then get the start and end dates of the year using startOfYear() and endOfYear() methods, then just pass em in and filter by added.

                    • All time top – Format the current date and pass in the first date as 1960?, maybe higher and filter by added.

                    • Platforms: PC, PlayStation, Xbox, Nintendo Switch, iOS, Android – I need to know which numbers correspond to which platforms, how? I think you can just pass em in one by one, see which platform icon gets rendered for the games, note them down and just filter by those numbers to get games available on each platform but wait, just coz the game’s available in one platform doesn’t mean it isn’t in another so multiple icons may get rendered, so how else? I think number just corresponds to the order of the platforms in the array that’s returned for each game’s data but what if I’m wrong? OKAY, if you really have to, then remove all the other icons for each icon and test each of the numbers for that icon and see which number renders this only available icon, so you’ll know without an iota of doubt that the platform corresponds to that number. Current numbers from what I can gather:
                        • 1: "PC"
                        • 2: "PlayStation"
                        • 3: "Xbox"
                        • 8: "Android"
                        • 5: "Apple Macintosh"
                        • 6: "Linux" Who even games on Linux? Ignore this
                        • 7: "Nintendo"

                • Genres: Action, Strategy, RPG, Shooter, Adventure, Puzzle, Racing, Sports – Same logic as the platforms but this one’s a bit trickier. Okay I really didn’t have to do all that with the platforms, each platform and genre, etc. has a unique id that can be obtained by using /genres or /platforms in the API URL which is what you use in the search query. I guess overthinking has its disadvantages. Oh well, these are the current Genre nums from what I can gather:
                    • 4: “Action” – DONE
                    • 10: “Strategy” – DONE
                    • 5: “RPG” – DONE
                    • 2: “Shooter” – DONE
                    • 3: “Adventure” – DONE
                    • 7: “Puzzle” – DONE
                    • 1: “Racing” – DONE
                    • 15: “Sports” – DONE
                    • 51: “Indie” – DONE
                    • 40: “Casual” – DONE
                    • 14: “Simulation” – DONE
                    • 11: “Arcade” – DONE
                    • 83: “Platformer” – DONE
                    • 59: “Multiplayer” – DONE
                    • 6: “Fighting” – DONE
                    • 19: “Family” – DONE
                    • 28: “Board Games” – DONE
                    • 34: “Educational” – DONE
                    • 17: “Card” – DONE

            v) After this point, it's straight forward just pass in the stateSetter of the pageState into the Sidebar component and then use it set it, then inside a componentDidUpdate(), you can recall the gamesData if the pageState was changed. For that, use the new func and the existing funcs you use for fetching and assign the data to gamesData state which will just display the appropriate games.

            vi) I need to find a way to keep the navlinks highlighted once they're clicked to show that the related data is being displayed on the page itself, how?
                • you can actually just use the pageState data to do this.
                • pass in the pageState as a prop to sidebar.
                • if for a link it's name or some unique descriptor of it matches the pageState value, then make the background of the svg white and the SVG itself black.


        5.2.3. Highlighting

            i) The NavLink’s icon has to be highlighted when that page is active. How do I accomplish this?

            ii) It’s simple dude, for each category, inside its styled component, if the pageState passed in matches the category of that link, then simply change the fill of the SVG to black and the background-color of div/span the svg is in to white.


        5.2.4. Wishlist

            i) How would I make the wishlist work?

            ii) Create a state for it that will hold the games added to wishlist

            iii) This state will store the added games to localStorage and fetch them on component mount if something already exists

            iv) So you don’t actually have to do any fetching for the Wishlist at all, probably true for the Cart as well.

            COMPLETE LOGIC:

            I need the game items added to wishlist to show up as GameCards when wishlist option is clicked on the sidebar. How?

            i) First, does wishlist have to be a context like cart? No, because wishlist is specific to Shop page alone.

            ii) So, you can simply create a state for wishlist which is an array that stores added games as objects with all props required by GameCard component.

            iii) Then all you have to do is update the gamesData state with the wishlist set of games. Then Games component will automatically display the games.

            iv) I need to store the games added to wishlist everytime it gets updated. Just add it to localStorage.

            v) You do have to add a limit of 20 or something. I don't think the localStorage can hold a lot of data. Nvm it can hold 52,000 objects at once lmao.

            vi) Add a button to each GameCard which can be used to add the game to the wishlist. Let it be some SVG that's empty and when the game is added, it needs to be filled. How? Simple, pass in the wishlist state and stateSetter to the Games and then to GameCard inside which you can use the stateSetter to add the game's details to the wishlist state and the state itself to check if it's id exists in the wishlist array of objects. If it does, then you can fill the SVG, otherwise no.

    5.3. Styling:

        i) You can use a flex with column direction and justify-content set to start, then separate the categories by a gap of say 1rem

        ii) Each category has a heading and its children sub-categories which have their icons and names

        iii) The icons’ background color has to change and its fill should also change on hover. You can just add the hover styles for all the navlinks inside Sidebar’s styled-component.

6.  GameCard component

    6.1. JSX:

        6.1.1. Game pic

            i) The main picture of the game will be displayed here at the top of the card

            ii) Could just be an img tag


        6.1.2. Details div

            i) First row will be Add to cart button on the left and the price button on the right.

            ii) Second row will be the icons of the platforms that the Game is available for like PlayStation, XboxOne, PC and so on.

            iii) Third row will be the Name of the game itself

    6.2. LOGIC:

        6.2.1. card state

            i) This state will receive the details for the card itself which it will store

            ii) Most likely an object


        6.2.2. Price Generator Func

            i) I need random prices for games as the RAWG API does not provide price details

            ii) Use Math.random() to generate random prices in the range from $10 to $70

            iii) You could probably do it dynamically and assign the price to the card state object as a property

            ISSUE: Thing is when I switch the pageState using the Navlinks, the same games get a different price if they show up in different pageStates. That shouldn’t happen, I need to be able to keep the price consistent for the same game across all the navlinks. How can I do this? There are two ways -

                • One is to find some way to tie the id of a game returned by the API with the random price that’s generated. I can’t think of a way to do this without a storage mechanism. I can use localStorage but it may not be sufficient enough to hold all the API data.

                • This one’s way easier. Just use some data that resembles the price of a game from the returned API’s gamesData to act as the game’s price. This way, it will always be consistent across all fetches. Yeah I’ll just do this.

                    • I can use the ratings data
                    • Out of all four types of ratings, choose the biggest number to act as the price
                    • But what if the game hasn’t released yet, I’ve seen some cases where the ratings data is just an empty array and some cases where there’s only one rating so its a full 100%.
                    • To account for the above cases, check for when the ratings array is empty or when the length is just 1. If either of those conditions are true, then use a default price value of 59.99.
                    • Create a function to streamline this.


        6.2.3. Click logic

            i) Clicking on the image or the name of the game should take the user to the dedicated page of the game.

            ii) Okay, you have to fetch the specific details pertaining to that Game alone which either of the elements are clicked.

            iii) Then, you have to route to the GameCard component but to enable routing, I need to use a NavLink or Link component from react-router right? Yes, the easiest way would be to add the Game pic itself as the background image of the anchor tag returned by Link comp. Or else you have to find some other way to route the user to the GameCard component while keep the regular elements.

            iv) Alright, its actually simple. You can just use the useNavigate hook. You can also pass in the id or the unique descriptor for the game that was clicked on using useNavigate().

            v) Alternatively, you can use the useParams hook, pass in the GameID to the URL itself and then inside GamePage Component simply fetch that id and then using that id, you can fetch the details of game using an API call. Do this if you want the game’s id to reflected in the url.

        6.2.4. Cart addition logic

            i) The add to cart button has to add the game to the cart. How?

            ii) Yeah its very simple, the cart state setter will be sent to the GameCard component's

            iii) You simply pass in a object that contains the relevant details of the game, probably the image, name and price will suffice to the cart state and it should update the cart

            iv) The cart state itself should also be passed into the GameCard component as well coz once the game gets added to the cart, the add to cart button changes to “Added” with a tick mark or something and it also has to revert back to Add to cart if it gets removed from cart so for both of those things to happen, GameCard needs to be aware of the cart’s contents.

        6.2.5. Icons logic

            i) Each of the platform icons should only show up if the game is available on that platform.

            ii) You can make each of them image tags and conditionally render them only when game’s API data contains that particular platform in it’s available list. Again you’d have to wait until you’ve looked at the API data to fully formulate this logic.

    6.3. STYLING:

        i) Use grid to create two rows, one for image, another for Game details

        ii) Game details can just be flex column with Add to cart + and price being a flex row

        iii) Add a Box-Shadow for the cards for a slight float effect

    6.4. Animations/Transitions

        6.4.1. The GameCard itself has to grow in size on hover.

            i) Yeah just use scale


        6.4.2. Click animation

            i) The GameCard has to play this click animation when it is added to the cart
                • The animation should reduce the scale of the GameCard back to its original size
                • Bring back the GameCard to the bigger scale size
                • This should happen in rapid succession to simulate the clicked effect.

            ii) But how will this animation be triggered?
                • Just pass in a prop cartAdded to the Styled-component of GameCard
                • Initialize it to false by default
                • when it becomes true, add the animation to the GameCard
                • If the hover state retains after the animation, then good. Otherwise, make the animation’s final state at 100% persist using animation-fill-mode: forwards but then how will the GameCard go back to its normal size when the user moves the cursor away from it. I think you simply have to find a way to re-trigger the hover styles after the animation ends, maybe trigger a state change on a timer to force a component rerender which by proxy would trigger the hover again?


        6.4.3. Image Loading animation:

            Currently, the image renders slowly and while the rendering is happening, the GameCard is just empty. I’d like to add a cool loading effect that happens in the background. So how?

            i) Create a LoadingDiv styled component – no need

            ii) It has to have the same measurement properties as the game image – You can just pass in those values to ShimmerDiv

            iii) It will have a z-index lower than the image tag so that it can be behind it and once the image renders, it will takeover the space. • no need I think

            iv) You can either refactor the checkout animation for the loading animation or you can find one online – found a lib

            v) I think the duration can be 10s long, maybe longer. Could make it infinite I guess but I don’t know if that will impact the performance of the store. • don’t matter, the animation just happens till loading is true and then stops.

            vi) Exact logic:
                • Create a state imageLoading which is set to true intially in the state declaration.
                • Create a stateSetter func for imageLoading
                • Setup the loading animation in the loading div. ou can make use of the shimmer-effects-react library for this.
                • The div gets rendered only when imageLoading is true
                • In the image tag, look for the onLoad event which gets triggered when the image finishes loading.
                • Inside this event, call the setImageLoading func, making the imageLoading false, thereby removing the LoadingDiv and stopping the animation.

7.  GamePage component

    7.1. JSX:

        7.1.1. Image slider

            i) The API will provide a bunch of images for the game

            ii) All of them have to be accessible via an image carousel with left and right buttons, and a navigation panel with circles indicating the images which can be clicked on to access a particular image.

            iii) Refer to your image-carousel implementation or maybe find a guide online for the best way to implement it in React.


        7.1.2. <- Legion button

            i) The user has to be able to go back to the Shop page

            ii) This button will enable that


        7.1.3. Game details – right side

            i) The Game name will be an h1 element

            ii) Game details like Website, date released, genres, action and so on will be under the game name. I think you can just copy the way it is RAWG’s official site

            iii) The game description will be a scrollable element coz it might be too long and I wanna keep this page unscrollable, on PC at least.


        7.1.4. Price and Add to Cart button – right bottom

            i) This will be at the bottom right of the page with price on the left and Add to Cart on the right.

    7.2. LOGIC:

        7.2.1. API call

            i) The game’s id will be sent to this component

            ii) So when the component mounts, the call will be made in an useEffect or I guess in ComponentDidMount() if you’re going with a Class component

            iii) As usual create loading and error states for both conditions to conditionally render appropriate JSX


        7.2.2. ← Legion button logic

            i) I think you just have to use the historyAPI and go back to the previous page stored in its state.

            ii) Nvm, react-router’s useNavigate is perfect for the job,

            iii) Just define it to a var and pass in -1 to it.


        7.2.3. Price logic:

            Okay, the thing is the same price in GameCard component has to be provided in the GamePage component as well. How do I do that? You can just pass it in using state prop of a Link element and then inside GamePage you’ll use useLocation() and then location.state to fetch that data which in this case is the Price. Ended up using the game’s rating as the price.


        7.2.4. Cart logic

            Maybe the header can stay stationary and the entire thing can GamePage component can render underneath it so that the cart’s stateSetter can be passed in. If that’s not possible then scrap stateSetter logic and use Contexts to send data to the cart for when a game is added to it.


        7.2.5. Fetch Logic

            i) Make the id of the game to be final route of the GamePage component

            ii) Inside GamePage component, fetch the url id in some manner.

            iii) Using the id, you can fetch the particular game's exact details.


        7.2.6. Date formatting for Game details:

            i) Create a separate js file for this which exports the func

            ii) Pass in the API's returned date string to this function.

            iii) Create a date object using this string with the help of parse method and new Date().

            iv) Use getYear() to get the year in yyyy format

            v) Use format with "MMM" to get the month in three letter format

            vi) Use format with "dd" to get the date

            vii) Once you have all those, you just just combine them using an escape string literal and return the result which gets displayed.

    7.3. Styling:

        i) Its straightforward, just use grid. You’ll know it when you make it, its too early rn.

        ii) I’ll make the description a scrollable element without a scroll-bar like the preview. Add a dark inset box-shadow underneath to indicate that to the user.

        iii) What are the other details that will be shown in the page?
            • Platforms
            • Genre
            • Release date – formatted to Month(short-form) Date, Year. For ex, “Mar 24, 2023”
            • Developers
            • Publishers
            • Age Rating

        iv) For the structure of these details, I think you can just copy RAWG’s structure, maybe I’ll add them to an expandable element.

        v) The price and Add to Cart + will be next to each other.

        vi) Themes – As usual get the themes from the context and apply it to the Legion back button on hover, to the Added “tick” if the game gets added to cart, and to the image-carousel’s image dots.

    7.4. Animations/Transitions:

        7.4.1. Image icon Switching

            i) The circle icon indicating the current image in the list of images needs a transition when switching from one image to the other:
                • Create a Colored circle
                • This moves across the image circles when left or right is clicked
                • You first need the image-carousel to figure this out fully

        7.4.2. Wave loading

            I need there to be a wave loading animation that plays behind the images while they render. How?

            i) You can add a linear gradient as the background of the image

            ii) Then, you can animate its background-position property, moving it from left to right

            iii) This will make it look like a loading animation.

            iv) Once the image fully loads and renders, it will overwrite the space, making the background disappear.

8.  CART Component:

    8.1. Logic:

        8.1.1. How do I make the cart appear and disappear?

            i) Render the cart component only when isCartVisible is true.

            ii) Pass in the Header component's state setter to Cart.

            iii) Have the cart stay off the screen to the right initially

            iv) Have the cart play an animation where it emerges from the right and goes to its spot and make that final state persist

            v) Initialize a "click" eventListener that checks if any click was on or off the Cart

            vi) If it was off the Cart, then add a different class to the Cart using a state which makes it disappear to the right again or find some way to make it disappear off to the right

            vii) Then inside a setTimeout once cart disappears, make the isCartVisible state false using the Header component's state setter making the Cart page disappear or try using onAnimationEnd event with the state which might work better.

            viii) I need to find a way to hide the scrollbars and stop scrolling from working when cart is open. Finish the above logic first.


        8.1.2. Cart storing logic:

            i) Create a state cart, which is an array, and a stateSetter for the cart. The array holds objects of game data.

            ii) Create a context and pass these props to it.

            iii) Then in the GameCard component, you can get the cart stateSetter from the context and add the data of the game to the cart state when the "add to Cart" button gets clicked.

            iv) Only the image url, name and price of the games are relevant, rest do not have to be passed in.

            v) Then in the Cart component, it imports the cart state, iterates through the array and just display the games added to the cart as cards.

            vi) The price of each game is added and it's reflected in the total amount.

            vii) That's it really. Whichever component adds to cart state, Cart component will display the new data as they're added.

            viii) I guess the Add to cart button in the GamePage would also add the game data to the cart state if it gets clicked on.

            ix) The cart should show a blue or red dot above it to the right if the cart is not empty. How? EZ, just download a monocolor dot svg and position it where you want it. Then according to the theme, you can change the color of it. If the cart state is not empty then you can display it. Conditional rendering rocks!

9.  HEADER Component:

    9.1. LOGIC:

        9.1.1. Logo:

            i) Hovering on the Logo should make it grow:
                • Make the entire div’s scale property increase in scale on hover
                • Inside its styled-component, add the above style.
                • Also add a transition for the transform

            ii) Clicking on the logo should lead back to the Homepage:
                • Make the entire logo itself a Link or Navlink tag from react-router
                • Make it’s “to” attribute equal the route of the homepage.


        9.2.2. Search bar:

            i) Will show results based on given input. Find out exactly how a search bar can be implemented:
                • Get the input value from the search bar by listening for the event “onKeyUp”
                • A second after the event, take the input value, iterate through the games data and find the games which contain this input string.
                • You can use String.includes() to perform the check and return only those games which return true.

            Actual Logic:
                • Okay, the thing is the API itself offers a search parameter which can be used to get search results for a given input
                • So all you have to do is get the input value from the search query and pass that in to the API URL and fetch with it.
                • I still think its better to listen for the “onKeyUp” event and wait for a second before initiating the search for the preview.

            ii) Preview component: This will show some results of the search before the search icon itself is pressed for the full results. Implement this first before the icon logic.
                • It will take the search bar’s input value as a prop
                • Then on component mount and update, it will use that value to perform the data fetching
                • I think you can reuse the same fetchGamesData function
                • Fetch 8 games for the preview, should be good enough
                • Try customizing the scroll bar to look nice, or remove it all together.
                • Also pass in the isShrinking state to this component, which you can then use to control its visibility.
                • The component will only mount if the search bar’s input is not null.
                • When isShrinking is true, it will dismount because that means the search bar lost focus, i.e., the user clicked off it.

            iii) Will take you to Shop page when the search icon is pressed, where the results of the search are shown. Wait until you’ve setup all the routing before implementing this but the logic is most likely this:
                • When the search icon is pressed, it will route to the Shop page
                • With it, it will take the search bar’s input as a parameter
                • The Shop component, will look out for this value and if it exists, it will set its pageState to “search” and use this value in its API fetching.
                • You can add a new case “search” in the getAPIURL func and add an additional parameter to the func, i.e., the search input.
                • Inside this case, it will simply return the appropriate URL with the search input.
                • From this point, the exisiting logic should suffice to handle data fetching.

10. Page transition: I want to add transitions across pages/routes in my app. What’s the logic?

    i) You can make use of the popular framer-motion library for this.

    ii) Create a Layout component and wrap all your pages with this component.

    iii) Inside Layout, use AnimatePresence and motion.div components to wrap the children passed to Layout.

    iv) You can define the transition variants in an object and add that to motion.div’s props.
    • initial: Starting state of the page on render
    • animate: Final state the page should end up in after page entry
    • exit: Final state the page should end up in after page exit

    v) Also, declare a useLocation() hook, get the location and add that location’s pathname prop as the key of the motion.div so it can re-render when the pathname changes.

11. Mobile Layout:

    11.1. Home page

        11.1.1. Header

            i) Make it static

            ii) Remove logo text and only keep logo icon

            iii) Remove the expand animation for the search

            iv) Remove the search icon


        11.1.2. Body

            i) InfoCard above, QuickNavigation below

            ii) Use flex with column direction


        11.1.3. Footer

            i) Put it in the center right below the QuickNavigation


        11.1.4. Video logic

            i) I need to make the video stationary and the page itself scrollable if needed

            ii) Have the min-height be 100dvh

            iii) The overflow styles can just be auto

    11.2. GamePage

        11.2.1. Header

            i) The previous styles would work just fine.


        11.2.2. TopRow

            i) Reduce font-size of GameName, maybe even line-height

            ii) Reduce font-size of BackButton


        11.2.3. BottomRow

            i) Right below the GameName, the ImageCarousel should be there

            ii) Then CartButton with price

            iii) Last are GameDetails with the description and the more dropdown

            iv) You can just change the grid layout, no need to switch to flex coz in that case, you’d have to reorder the JSX which is unnecessary.

    11.3. Shop

    Make the page flex-column instead of grid.

        11.3.1. Header

            i) Can stay the same


        11.3.2. Sidebar

            i) Remove the default sidebar

            ii) Create a floating button that opens the sidebar. This should be located in the bottom-right of the page.

            iii) The sidebar expands from this button instead

            iv) The sidebar has a fixed/absolute position with a z-index higher than the Shop itself.

            v) Cart still has a higher z-index than Sidebar’s open button. Why? The user clicks on the Cart button to see the cart and that alone so there is no need to open the sidebar of the shop from inside the Cart page.

            vi) Expand button / Hamburger Menu logic:
                • So the button itself is a checkbox with a label which when checked will open this div which has a radial gradient background (which is originally the same size as the checkbox label but sits behind the checkbox) that expands to the dimensions of the entire page.
                • Then after it expands, you just have to display the Sidebar on top of it by having it use the full screen and also by giving it a larger z-index.
                • Switch the blacks and whites on the sidebar to align with the color of the radial gradient.
                • For the animation from hamburger to X, you can create three lines on a span element inside the label by using itself, its before and its after states. Then when the checkbox is checked, you can remove the span’s line by making it transparent and tilting the before and after lines using rotate to maybe 120deg. Just make all that a smooth transition.


        11.3.3. FirstRow

            i) Reduce the h1’s font size

            ii) Decrease the size of the dropdown’s width, maybe the font-size as well

            iii) Remove the gap between the dropdowns

12. Testing:

    At last I’m here. So, how do I test the app? For starters, do not test implementation details and routes. You have to think in terms of UX and how the user would interact with the page and ensure each component performs what its supposed to do aka Unit Testing. I’ll just go component by component and test that each works as intended.

    For finding all the elements to be tested, if the default method doesn’t work, then just assign them a unique testId and use that to get their values in the test.

    Test the app in a pagewise manner

    12.1. Cart – DONE (Actually have Cart tests subsumed into Shop and refactor all localStorage logic into actual user interaction logic)

    What are all the functionalities that I can test for the Cart component?

        i) The cart has to open when the cart button is clicked
            • Render the Home component
            • Use getByAltText to find the CartIcon img with alt = “a cart icon”
            • Fire a click event on the img tag using user.click()
            • Then check if the text “Games” or “Total” is present on the screen using the screen object and getByText to test if cart renders.

        ii) The cart has to close when part of the page that’s outside the Cart is clicked
            • Render the Home component
            • Get the document.body element
            • Fire a click event on that element using user.click().
            • Then check that the text “Games” or “Total” is NOT present on the screen using the screen object and getByText to test if cart renders.

        iii) Clicking the Clear button should empty the cart (delete all cartItems)
            • Add a couple mock items to the cart
            • Get the clear button by getByText and fire a click event on it
            • Check that the GameNames of the removed items are NOT present in the cart

        iv) Clicking X button on the cartItem should remove it from the cart
            • Same logic as clear but you check that the particular item alone is not present

        v) The no. of games displayed should correspond to the no. of cart items
            • Add a few mock items to the cart
            • Get the element that displays the count
            • Ensure the textContent returned matches the data

        vi) The total price should equal the added sum of the price of each cart item
            • Add some mock items to cart
            • Set prices for each of them
            • Check that the element containing the total price equals the total of the mock items.

        vii) A dot icon outside the Cart icon indicates that there are items in the cart when the cart is closed
            • Add some items to “cart” key in localStorage
            • Render App
            • Assign a testid to the dot icon
            • Get the dot icon by its testid
            • Assert that it exists in the DOM

    12.2. Home - DONE

    For all fetch calls, Create a mock fetch function with a global scope in a beforeEach() call and reset the mocks after each test in a afterEach() call.

        12.2.1. Header - DONE

            i) Clicking the logo icon brings you back to Home page
                • First go into Shop by clicking any of the QuickNavigation buttons
                • Once in Shop, assert that by checking a Shop-specific detail, maybe the “Your Games” text from sidebar
                • Then get the Logo of the app by its text or testid
                • Fire a click on the Logo
                • Assert that the screen contains a Home-specific detail, maybe even my name “suryakumar-selvakumar”.

            ii) Search preview works and shows related items to search input after user stops typing
                • Assign a testid to the input
                • Use userEvent’s type method to provide input to the input element
                • Mock preview’s fetch and provide dummy data
                • Assign a test-id to GameName in preview
                • Get all the game names that render in the preview using getAllByTestId()
                • Check that the textContent inside each equals that of the provided dummy data

            iii) Search bar works and shows items related to search input
                • Similarly to ii), Use userEvent’s type method to provide input to the input element
                • Assign a testid to search icon
                • Mock preview’s fetch and provide dummy data
                • Use assertShopItems to check that the pageState and Games Data matches the provided input and dummy data.


        12.2.2. InfoCard - DONE

            i) The “suryakumar-selvakumar” button with the github icon leads to my GitHub
                • Assign a test-id to the button with the same name
                • Click it with user.click()
                • Assert that the window.location.pathname matches “https://github.com/Suryakumar-Selvakumar”

            ii) The “RAWG API” button leads to their webpage
                • Assign a test-id to the button with the same name but in lowercase
                • Click it with user.click()
                • Assert that the window.location.pathname matches “https://rawg.io/apidocs”

        12.2.3. QuickNavigation - DONE

            i) I'm feeling lucky button renders a random game in the <GamePage /> component
                • Use mockResolvedValueOnce() three times to return dummy data for the three consecutive fetch calls that happen once the button is pressed.
                • The dummy data for each fetch has to resemble the structure necessary for each state to update in QuickNavigation and in GamePage.
                • Get the button by its text and fire a click on it.
                • Then test that the page contains the dummy data and that’s it.

            ii) New this week button leads to the <Shop /> page and renders those games..
                • Fire a click on the button
                • Use mockResolvedValueOnce() to return your dummy data for <Shop />
                • The dummy data should match the structure of gamesData used in Shop.
                • Test that the text "This week" exists inside the h1 below the header
                • Test that your dummy data can be seen in the GameCards

            iii) Last 30 days button leads to the <Shop/> page and renders those games.
                • Follow same approach as in ii) but change the pageState value appropriately.

            iv) Best of the year button leads to the <Shop/> page and renders those games.
                • Follow same approach as in ii) but change the pageState value appropriately.

            v) Popular in 2026 button leads to the <Shop/> page and renders those games.
                • Follow same approach as in ii) but change the pageState value appropriately.

            vi) All time top button leads to the <Shop/> page and renders those games.
                • Follow same approach as in ii) but change the pageState value appropriately.

        12.2.4. Footer - DONE

            i) Clicking the checkbox changes the theme of the App.
                • Try to get the checkbox by its role, otherwise assign a testid and get it that way
                • Get the LogoIcon image in the Header, assert that its src matches the norse theme’s omegaNorseIcon first
                • Fire a click on the checkbox
                • Now assert that the LogoIcon’s src matches the greek theme’s omegaGreekIcon

    12.3. GamePage

        12.3.1. Header - DONE

            i) Search bar leads to a new game in the same page


        12.3.2. First Row - DONE

            i) Clicking the legion button takes the user back to the Shop
                • Assign a testid for the legion button
                • Fire a click on it
                • Assert that a Shop-specific text like “Your Games” exists in the DOM.

            ii) GameName renders correctly in the DOM


        12.3.3. Drop Down - DONE

            i) The more button has to open the gameDetails
                • Get the element
                • Fire a click event
                • Check that text such as “Platforms”, “Genre”, etc. are present on the screen


        12.3.4. Cart - DONE

            i) Clicking Add to cart + Should add the game to the cart
                • Same logic as in GameCard but render the GamePage instead and click on that Add to Cart button.

            ii) Add to cart button text changes to added after adding the game to cart


        12.3.5. Wishlist

            i) Clicking the Wishlist icon adds the game to the wishlist.
                • Assign a testid to wishlist icon
                • Get it by its id
                • Click it
                • Get the legion button by its id and press it
                • Assign a testid to wishlist nav link
                • Once in Shop, check that you’re in shop by asserting the existence of the wishlist nav-link.
                • Once it proves to exist, click on it
                • Then waitFor and assert the existence of the name of the game that the user added to wishlist in GamePage.

            ii) Clicking the Wishlist icon removes the game from the wishlist.
                • Now, I could add the do all the previous steps, check that the game was added to wishlist and then go back to the GamePage and then click the wishlistIcon again to remove the game from the wishlist and then go to the shop and click wishlist again and check that the game does not exist or I could just add the gameItem to the wishlist via localStorage, then follow the previous steps to get to wishlist to check that the game does not exist.
                • That can be done by checking that the Games div in shop has no children, meaning no GameCard rendered, i.e., the game got removed from wishlist.

    12.4. Shop

        12.4.1. Header - DONE

            i) Search bar updates the shop with results related to search

            ii) All Cart tests – move here.


        12.4.2. Dropdown - DONE

            i) Clicking on the Dropdown openers should open the dropdown
                • Get the Dropdown open using the “Order by” text
                • Fire a click event
                • Check that the text “Name”, “Release Date”, “Popularity”, “Rating” are on the screen
                • Do the same thing for Sort by but check for “High to Low” and “Low to High” instead.

            ii) Clicking on any of the options in the dropdown should close the dropdown and update the opener with that option
                • Get the Dropdown open using the “Order by” text
                • Fire a click event
                • Click any of the options, maybe “Name” by getting their Text
                • Check that the other options “Release Date”, “Popularity”, “Rating” do no exist on the screen
                • Check that the selected option is on the screen.


        12.4.3. Sidebar - DONE

            i) Clicking on each of the Sidebar nav items should display the appropriate content in the Shop
                • Get each of the NavItems by text
                • Fire a click on them
                • Check that the h1 in the Shop contains the same corresponding name
                • Send dummy data via mock fetch
                • Check that the data renders on the screen


        12.4.4. GameCard

            i) Clicking on the wishlist button should add the game to the wishlist
                • Add a title to the wishlist SVG
                • Get the SVG by its title
                • Fire a click event
                • Try getting Wishlist by its text, if that doesn’t work, assign a testId
                • Fire a click event on it.
                • Check that the GameName exists on the screen.

            ii) Click on the wishlist button again should remove the game from the wishlist
                • Get the SVG again
                • Click it
                • Check that the GameName no longer exists on the screen

            iii) Clicking Add to cart + Should add the game to the cart
                • Render the Shop component
                • Create a few fake games with data necessary for GameCard
                • Mock an API fetch call and assign the mock data to gamesData
                • Get the Add to Cart button on the rendered GameCard using getByText()
                • Then fire a click on the button using user.click()
                • Use getByAltText to find the CartIcon img with alt = “a cart icon”
                • Fire a click event on the img tag using user.click() to open the Cart
                • Then check if the name of the game exists inside the cart, might be easier to assign a testId to the GameName and check if its textContent matches the mock game’s name.

            iv) Clicking on GameName & GameImage should lead to the GamePage of the game.

13. Keyboard/Screen Reader/ARIA accessibility

    13.1. Components

        • Cart – DONE
        • CartContext – DONE
        • CartProvider – DONE
        • DropDown – DONE
        • Error – DONE
        • Footer – DONE
        • GameCard – DONE
        • Games – DONE
        • Header – DONE
        • InfoCard – DONE
        • Loading – DONE
        • Preview – DONE
        • QuickNavigation – DONE
        • Sidebar – DONE
        • Slider – DONE
        • withRouter – DONE

    13.2. Pages

        • ErrorPage – DONE
        • GamePage – DONE
        • Home – DONE
        • Layout – DONE
        • Shop – DONE
        • ShopWrapper – DONE
