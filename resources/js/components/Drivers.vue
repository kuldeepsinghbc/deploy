<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Drivers Table</h3>
                <div class="card-tools">
                  <button class="btn btn-success" @click="newModal" >Add New Driver
                    <i class="fas fa-user-plus fa-fw"></i>
                  </button>
                  
                </div>
              </div>
              <!-- /.card-header -->
              <!-- <div class="card-body table-responsive p-0"> -->
                <v-data-table
                  :headers="headers"
                  :items="drivers"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td v-for="(header,index) in headers" :key="index">{{ props.item[header.value] }}</td>
                    <!-- <td>{{ props.item.id }}</td> -->
                     <!-- <td class="">{{ props.item.name }}</td> -->
                    <!--<td class="">{{ users.item.email }}</td>
                    <td class="">{{ users.item.type }}</td>
                    <td class="">{{ users.item.created_at |myDate }}</td>  -->
                    <!-- <td class="">{{ props.item.created_at |myDate }}</td>-->
                    <td>
                        <!-- <a href="#" @click="editModal(props.item)">
                          <i class="fa fa-edit blue--text"></i>
                        </a>/
                        <a href="#" @click="deleteUser(props.item.id)">
                          <i class="fa fa-trash red--text"></i>
                        </a> -->
                        <v-icon
                          small
                          class="mr-2"
                          @click="editModal(props.item)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deleteUser(props.item.id)"
                        >
                          delete
                        </v-icon>
                      </td>
                  </template>
                </v-data-table>
              <!-- </div> -->
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNew Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New</h5>
                <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update User's Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form @submit.prevent="editmode ? updateUser() : createUser()">
                <div class="modal-body">
                  <div class="form-group">
                    <input v-model="form.name" type="text" name="name"
                        placeholder="Name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                      <input v-model="form.email" type="email" name="email"
                          placeholder="Email Address"
                          class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                      <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                      <textarea v-model="form.bio" name="bio" id="bio"
                      placeholder="Short bio for user (Optional)"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                      <has-error :form="form" field="bio"></has-error>
                    </div>
                    <div class="form-group">
                      <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                          <option value="">Select User Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">Standard User</option>
                          <option value="author">Author</option>
                      </select>
                      <has-error :form="form" field="type"></has-error>
                    </div>
                    <div class="form-group">
                      <input v-model="form.password" type="password" name="password" id="password"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                      <has-error :form="form" field="password"></has-error>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <button v-show="editmode" type="submit" class="btn btn-primary">Update </button>
                  <button v-show="!editmode" type="submit" class="btn btn-primary">Create </button>
                </div>
              </form>
            </div>
        </div>
</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                editmode:false,
                // users : {},
                form: new Form({
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                }),
                headers: [
                {
                  text: 'ID',
                  align: 'left',
                  // sortable: false,
                  value: 'id'
                },
                { text: 'Name', value: 'name' },
                // { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email',sortable: false, },
                { text: 'Type', value: 'type',sortable: false, },
                { text: 'Registered At', value: 'created_at',sortable: false, },
                { text: 'Actions', value: 'Actions' }
              ],
              drivers: []
            }
        },
        methods:{
          updateUser(){
            this.$Progress.start();
            // console.log('Editing data');
            this.form.put('api/user/'+this.form.id)
            .then(()=>{
              $('#addNew').modal('hide');
              Swal.fire(
              'Updated',
              'Information has been updated.',
              'success'
              )
              this.$Progress.finish();
              Fire.$emit('AfterCreate');
            })
              .catch(()=>{
                this.$progress.fail();
              });
          },
          editModal(user){
            
            this.editmode = true;
            this.form.reset();
            $('#addNew').modal('show');
            this.form.fill(user);
          },
          newModal(){
            this.editmode = false;
            this.form.reset();
            $('#addNew').modal('show');
          },
        deleteUser(id){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            // Send request to the server
              if(result.value){
                  this.form.delete('api/user/'+id).then(()=>{
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                      Fire.$emit('AfterCreate');
                  }).catch(()=> {
                      Swal.fire("Failed!", "There was something wronge.", "warning");
                  });
              }
            })           
          },  
          loadDrivers(){
            axios.get("api/user").then(({data})=>{
               this.drivers.push(...data.data);
            });
          },
          createUser(){
            this.$Progress.start();

                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $('#addNew').modal('hide')

                    Toast.fire({
                        type: 'success',
                        title: 'User Created  successfully'
                        })
                    this.$Progress.finish();

                })
                .catch(()=>{

                })        
          },
          
        },
         created() {
            this.loadDrivers();
            Fire.$on('AfterCreate',()=>{
              this.loadDrivers();
            })
        }
    }
        
    
</script>