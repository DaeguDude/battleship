// createRange와 createContextualFragment를
// 이용하여 그냥 html을 때려박으면 조금 더 편하게 작업이 가능할 것 같다 ㅋ

/**
 * 먼저 getFrontPage를 통하여, html을 돌려주고 view에서 컨트롤을 하면 될듯하다
 */
export function getFrontPage() {
  return `
  <div class="enter-screen h-screen w-screen flex flex-col text-[#191414]">
  <header
    class="
      bg-[#1db954]
      text-white
      flex
      justify-center
      items-center
      h-[70px]
    "
  >
    <h1 class="text-4xl uppercase font-bold">battleship</h1>
  </header>

  <main class="bg-[#fff] grow flex flex-col justify-center items-center">
    <h2 class="text-center text-3xl uppercase font-bold">
      welcome on board! <br />
      to start the game, enter your name
    </h2>
    <input
      type="text"
      class="
        user-name
        h-[50px]
        my-4
        border-2
        py-2
        px-3
        outline-none
        rounded-lg
        text-xl text-center
      "
    />
    <button
      class="start-game-btn border-2 uppercase font-bold p-2 rounded-lg bg-[#1DB954]"
    >
      start <br />
      the game
    </button>
  </main>

  <footer
    class="
      bg-[#1db954]
      text-white
      flex
      justify-center
      items-center
      h-[70px]
    "
  >
    created by DaeguDude
    <a
      class="text-2xl pl-2 hover:text-[#1db954]"
      href="https://github.com/daegudude"
      ><i class="fab fa-github"></i
    ></a>
    <a
      class="text-2xl pl-2 hover:text-[#1db954]"
      href="https://twitter.com/Daegudude_Kim"
      ><i class="fab fa-twitter-square"></i
    ></a>
    <a
      class="text-2xl pl-2 hover:text-[#1db954]"
      href="mailto:k3hppk@gmail.com"
      ><i class="far fa-envelope"></i
    ></a>
  </footer>
</div>
  `;
}
