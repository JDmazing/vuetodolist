/**
 * Represents a TodoList component.
 * @module TodoList
 * @default
 */
export default {
  // name of component
  name: 'TodoList',

  data() {
    return {
      new_task: '',
      task_list: [],
      alert: false,
      show_dialog: false
    }
  },

  computed: {
    taskDoneCount() {
      // return number of tasks with status.done = true
      return this.task_list.filter(todo => todo.status.done).length
    }
  },

  methods: {
    checkDuplicateTask(task) {
      // return true if task already exists
      return this.task_list.some(todo => todo.name === task)
    },

    doneTask(index) {
      // toggle status.done of task at index
      this.task_list[index].status.done = !this.task_list[index].status.done;
    },

    addTask() {
      this.new_task = this.new_task.trim()
      if (this.new_task && !this.checkDuplicateTask(this.new_task)) {
        // add new task to task_list
        let task_item = {
          id: this.task_list.length + 1,
          name: this.new_task,
          status: {
            done: false
          }
        }

        // push new task to task_list
        this.task_list.push(task_item)
        this.new_task = ''
      } else {
        if (this.new_task !== '') {
          // show alert if task already exists
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 2000)
        }
      }
    },

    removeTask(index) {
      // remove task at index
      this.task_list.splice(index, 1)
    },

    removeAllTask() {
      // remove all tasks
      this.task_list = []
      this.new_task = ''
      this.show_dialog = false
    },

    removeDoneTask() {
      // remove all tasks with status.done = true
      this.task_list = this.task_list.filter(todo => !todo.status.done)
    }
  },

  created() {
    // get task_list from localStorage
    let task_list = localStorage.getItem('task_list')
    if (task_list) {
      this.task_list = JSON.parse(task_list)
    }
  },

  watch: {
    // watch for changes in task_list and save to localStorage
    task_list: {
      handler() {
        localStorage.setItem('task_list', JSON.stringify(this.task_list))
      },
      deep: true
    }
  }
}