<template>
    <nav class="circle">
        <a class="navbar-brand disabled">
            <img src="/youNUS_logo2.png" width="65" height="75" class="d-inline-block align-top" alt="">
        </a>
        <ul>
            <li><router-link to="/" class="mr-5">Main</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
    </nav>



</template>

<script>
    export default {

    }
</script>

<style scoped>
    .navbar {
        display: block;
        border-radius: 0 !important;
    }

    body {
        font-family: 'Roboto', sans-serif;
        padding: 0;
        margin: 0;
    }

    small {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
    }

    h1 {
        text-align: center;
        padding: 50px 0;
        font-weight: 800;
        margin: 0;
        letter-spacing: -1px;
        color: inherit;
        font-size: 40px;
    }

    h2 {
        text-align: center;
        font-size: 30px;
        margin: 0;
        font-weight: 300;
        color: inherit;
        padding: 50px;
    }

    .center {
        text-align: center;
    }

    section {
        height: 100vh;
    }

    /* NAVIGATION */
    nav {
        margin: 0 auto;
        background: #333;
        padding: 10px 0;
        box-shadow: 0px 5px 0px #dedede;
    }

        nav ul {
            list-style: none;
        }

            nav ul li {
                display: inline-block;
            }

                nav ul li a {
                    display: block;
                    padding: 8px;
                    text-decoration: none;
                    color: white !important;
                    font-weight: 500;
                    text-transform: uppercase;
                }

                    nav ul li a,
                    nav ul li a:after,
                    nav ul li a:before {
                        transition: all .5s;
                    }

                        nav ul li a:hover {
                            color: #808080;
                        }

        /* Circle */
        nav.circle ul li a {
            position: relative;
            overflow: hidden;
            z-index: 1;
        }

            nav.circle ul li a:after {
                display: block;
                position: absolute;
                margin: 0;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                content: '.';
                color: transparent;
                width: 1px;
                height: 1px;
                border-radius: 50%;
                background: transparent;
            }

            nav.circle ul li a:hover:after {
                -webkit-animation: circle 1.5s ease-in forwards;
            }


    /* Keyframes */
    @-webkit-keyframes fill {
        0% {
            width: 0%;
            height: 1px;
        }

        50% {
            width: 100%;
            height: 1px;
        }

        100% {
            width: 100%;
            height: 100%;
            background: #333;
        }
    }

    /* Keyframes */
    @-webkit-keyframes circle {
        0% {
            width: 1px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            height: 1px;
            z-index: -1;
            background: #808080;
            border-radius: 100%;
        }

        100% {
            background: #414141;
            height: 5000%;
            width: 5000%;
            z-index: -1;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 0;
        }
    }
</style>