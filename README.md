# nasheed
Clean, simple and fast nasheed player.

## Mission
Inspired by https://focusmusic.fm, nasheed.app (domain already registered 👍🏽) aims to help Muslims have a quick and easy alternative to Music. Many people listen to music just because they "need something in the background while working". Obviously, it's not acceptable to listen to Quran, and it would be ideal if people could always work without needing more stimulation, but nasheed's can fulfill that need.

So nasheed.app will offer all that. We will avoid any content where there is scholarly *iktilaf* – so no nasheeds with any kind of instrument (even duff!). This is so we take the most cautious route, and all kinds of users can benefit and enjoy this app.

## Contributions

Focusing on design now, here's the [Figma project](https://www.figma.com/file/V6fqOaxQOcSZ0o1HzeZwDM/Untitled?node-id=0%3A1). It is a copy of focusmusic.fm — we can come up with something different and/or ask for permission to use a very similar design. An icon is also needed. For color scheme, I think the green and yelllow from the Figma project is nice.

Also looking for nasheeds that can be served by this app. While we can just embed YouTube using the Vime library, I would prefer original nasheeds that fulfill the criteria above. So if you know any artists who would like to submit their recordings for publishing on this ad-free app, please send them this way!

The actual app should be a PWA for easy access across devices, especailly desktop (where many people work) and even phones (with Android getting first class TWAs in the Play Store). iPhone users will have to stick to a basic webview for now.

I (@mr-islam) plan to begin coding this in Svelte beginning in December 2020 / January, *insha Allah*. 

Choice of framework (or, in this case compiler) is subjective, but Svelte is amazing and having written layl-pwa and qawl-v2 using it, I really love it and am most productive in it. I hope this is not a barrier for anyone hoping to contribute. Svelte does introduce some custom templating in the HTML (which is done well, but still a turn-off for many), but in exchange gives an almost vanilla experience in the actual JS with `$` just for reactivity. Built in stores and animations are icing on the cake. 
