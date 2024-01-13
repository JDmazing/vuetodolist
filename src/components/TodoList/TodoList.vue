<template>
  <v-container class="todo-list-wrapper">
    <v-row class="center-row">
      <v-col cols="12"
        sm="8"
        md="6">
        <h1>Vue TODO List</h1>
        <v-card
          class="center-card"
          shaped>
          <v-toolbar
            color="grey lighten-4"
            flat>

            <v-spacer></v-spacer>
            
            <div class="text-center">
              <v-chip
                class="ma-2"
                color="primary"
                text-color="white">
                Tasks
                <v-avatar
                  right
                  class="white">
                  <span class="black--text">{{ task_list.length }}</span>
                </v-avatar>
              </v-chip>

              <v-chip
                class="ma-2"
                color="green"
                text-color="white">
                Tasks Done
                <v-avatar
                  right
                  class="white">
                  <span class="black--text">{{ taskDoneCount }}</span>
                </v-avatar>
              </v-chip>
            </div>

            <v-btn
              class="remove-done-btn"
              depressed
              color="error"
              small
              v-show="taskDoneCount > 0"
              @click="removeDoneTask">
              <v-icon left>
                mdi-delete
              </v-icon>
              Tasks Done
            </v-btn>

            <v-btn
              class="remove-all-btn"
              depressed
              color="error"
              @click="show_dialog = !show_dialog && task_list.length > 0">
              <v-icon left>
                mdi-delete
              </v-icon>
              Tasks
            </v-btn>
          </v-toolbar>

          <!-- Confirmation Dialog -->
          <v-dialog v-model="show_dialog"
            max-width="500">
            <v-card>
              <v-card-title class="headline">
                Confirm Deletion
              </v-card-title>
              <v-card-text>
                Are you sure you want to delete all tasks?
              </v-card-text>
              <v-card-actions>
                <v-btn @click="show_dialog = false">
                  Cancel
                </v-btn>
                <v-btn @click="removeAllTask"
                  color="red"
                  dark>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider></v-divider>

          <v-container class="list-wrapper">
            <v-list
              subheader>
              <v-list-item v-for="(todo, index) in task_list"
                :key="index"
                class="task-item"
                transition="fade">
                <template v-slot:default="{}">
                  <v-list-item-action>
                    <v-btn
                      icon
                      :color="todo.status.done == false ? 'grey' : 'green'"
                      @click="doneTask(index)">
                      <v-icon v-if="todo.status.done == false">mdi-circle-outline</v-icon>
                      <v-icon v-else>mdi-check-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-subtitle :style="{ 'text-decoration': todo.status.done ? 'line-through' : 'none' }">
                      {{ todo.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-btn
                    class="delete-btn"
                    icon
                    color="red"
                    @click="removeTask(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-container>

          <v-text-field
            class="add-task-input"
            v-model="new_task"
            placeholder="New Task"
            @keyup.enter="addTask"
            hide-details="auto">
            <v-btn
              icon
              color="primary"
              @click="addTask"
              slot="append">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-text-field>
        </v-card>

        <div class="alert-container">
          <v-alert
            class="alert-warning"
            :value="alert"
            border="left"
            shaped
            type="warning"
            max-width="500">
            Task already exists!
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./script.js"></script>

<style lang="scss">
  @import './style.scss';
</style>
