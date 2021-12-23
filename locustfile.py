from locust import HttpUser, task, between, constant

class WebsiteTestUser(HttpUser):
    #wait_time = between(0.5, 3.0)
    #wait_time = 1
    
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        pass

    @task(1)
    def hello_world(self):
        self.client.get("http://localhost:5000/convo/page/0")

    wait_time = constant(0.008) 