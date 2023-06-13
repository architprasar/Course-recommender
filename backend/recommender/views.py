from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from recommender.models import RoadMap
from recommender.utils import chat, rec_func, find_closest_data, course_data_from_csv
# Create your views here.


class Roadmap(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        crs = request.data["crs"]
        lvl = request.data["lvl"]
        result = chat(crs, lvl)
        print(result)
        # result = """
        # 1. Start with a solid foundation in mathematics and statistics.
        # 2. Learn programming languages like Python and R.
        # 3. Understand basic concepts of data analysis and manipulation.
        # 4. Study supervised learning algorithms like linear regression and decision trees.
        # 5. Dive into unsupervised learning techniques such as clustering and dimensionality reduction.
        # 6. Familiarize yourself with evaluation metrics and model validation techniques.
        # 7. Learn about neural networks and deep learning architectures.
        # 8. Gain practical experience by working on real-world datasets and projects.
        # 9. Explore natural language processing and computer vision applications.
        # 10. Stay updated with the latest research and advancements in the field.
        # 11. Develop strong problem-solving and critical thinking skills.
        # 12. Participate in Kaggle competitions and join online communities to collaborate and learn from others.
        # 13. Specialize in a specific domain or subfield within machine learning, such as reinforcement learning or time series analysis.
        # 14. Continuously improve and update your knowledge and skills through continuous learning and experimentation.
        # """
        available = find_closest_data(crs)

        if type(available) == list:
            final_avl = available
            final_avl = list(
                filter(lambda x: x["Difficulty Level"].lower() == "beginner", available))
            # final_avl = sorted(
            #     final_avl, key=lambda x: x["Course Rating"], reverse=True)

            roadmapinstance = RoadMap.objects.create(
                course=crs, user=request.user, level=lvl, course_prior=final_avl[0]["Course Name"])

        else:
            roadmapinstance = RoadMap.objects.create(
                course=crs, user=request.user, level=lvl,)
            final_avl = available
        roadmapinstance.save()

        return Response({"roadmap": result, "list": final_avl}, status=status.HTTP_200_OK)


class GetSearchRecommendations(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = []
        while True:
            if RoadMap.objects.filter(user=user).exists():

                roadmapinstance = RoadMap.objects.filter(
                    user=user).order_by("created_on").first()
                if not roadmapinstance.course_prior == "roadmapinstance":
                    name = roadmapinstance.course_prior.replace(
                        ',', '').replace(':', '')
                    print(name)
                    data = rec_func(name)
                    break
                else:
                    del roadmapinstance
            else:
                break
        if len(data) > 0:
            final_data = course_data_from_csv(data)
        return Response({"data": final_data}, status=status.HTTP_200_OK)
