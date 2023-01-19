var editor = grapesjs.init({
    container : '#gjs',
    components: '<div class="txt-red">Hello world!</div> ',
    style: '.txt-red{color: red}',
    heigt: '100%', 
    plugins: [Block]

});

function Block(editor){
    editor.BlockManager.add('my-first-block', {
      label: 'Block de texte Simple',
      content: '<div class="my-block">This is a simple block</div>',
    });
}
