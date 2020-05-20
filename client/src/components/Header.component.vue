<template>
    <header class="nav">
        <h1 class="logo">dearlife</h1>
        
        <ul class="nav__list">
            <li class="nav__item">
                <a href="http://www.Google.com" class="nav__link">Search</a>
            </li>
            <li class="nav__item">
                <a href="http://www.Google.com" class="nav__link">Log In</a>
            </li>
            <li class="nav__item">
                <a href="http://www.Google.com" class="nav__link nav__link--active">Sign Up</a>
            </li>
        </ul>
    </header>
</template>

<script>

    export default {
        
    }
</script>

<style lang="scss" scoped>
    .nav{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4rem 0 4rem;
        height: 5.5rem;

        &__list{
            list-style: none;
            display: flex;
        }

        &__item{
            margin-left: 2rem;
            font-size: 1.8rem;
            font-weight: 600;
        }

        &__link{
            text-decoration: none;
            color: #fff;

            &--active{
                background-color: #fff;
                color: rgba(0, 0, 0, .7);
                border-radius: 1px;
                padding: .5rem 1.3rem .5rem 1.3rem;
                transition: all .2s;

                &:hover{
                    color: #000;
                }
            }
        }
    }
</style>