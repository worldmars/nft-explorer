<template id="example-modal">
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
          <button type="button" v-on:click="modalAction" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{description}}
        </div>
        <div class="modal-footer">
          <button type="button" v-on:click="modalAction" data-dismiss="modal" class="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['title', 'description', 'modalAction', 'txid']
}
</script>