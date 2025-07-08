
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThreadDumpAnalyzer } from "@/components/ThreadDumpAnalyzer";
import { HeapDumpAnalyzer } from "@/components/HeapDumpAnalyzer";
import { JBossLogAnalyzer } from "@/components/JBossLogAnalyzer";
import { MySQLQueryAnalyzer } from "@/components/MySQLQueryAnalyzer";
import { DashboardOverview } from "@/components/DashboardOverview";
import { Activity, Database, Server, Zap, Upload, AlertTriangle, TrendingUp } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Active Threads",
      value: "247",
      change: "+12%",
      icon: Activity,
      status: "warning"
    },
    {
      title: "Heap Usage",
      value: "78%",
      change: "+5%",
      icon: TrendingUp,
      status: "danger"
    },
    {
      title: "Error Rate",
      value: "2.3%",
      change: "-0.8%",
      icon: AlertTriangle,
      status: "success"
    },
    {
      title: "Slow Queries",
      value: "43",
      change: "-15%",
      icon: Database,
      status: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DevOps Analytics Dashboard</h1>
                <p className="text-slate-400">Performance monitoring and troubleshooting platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Live monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <Badge 
                        variant={stat.status === 'success' ? 'default' : stat.status === 'warning' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    stat.status === 'success' ? 'bg-green-600/20 text-green-400' :
                    stat.status === 'warning' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">System Analysis</CardTitle>
            <CardDescription className="text-slate-400">
              Comprehensive analysis tools for performance monitoring and troubleshooting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                  <Server className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="thread-dump" className="data-[state=active]:bg-blue-600">
                  <Activity className="h-4 w-4 mr-2" />
                  Thread Dumps
                </TabsTrigger>
                <TabsTrigger value="heap-dump" className="data-[state=active]:bg-blue-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Heap Analysis
                </TabsTrigger>
                <TabsTrigger value="jboss-logs" className="data-[state=active]:bg-blue-600">
                  <Zap className="h-4 w-4 mr-2" />
                  JBoss Logs
                </TabsTrigger>
                <TabsTrigger value="mysql-queries" className="data-[state=active]:bg-blue-600">
                  <Database className="h-4 w-4 mr-2" />
                  MySQL Queries
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <DashboardOverview />
              </TabsContent>

              <TabsContent value="thread-dump" className="mt-6">
                <ThreadDumpAnalyzer />
              </TabsContent>

              <TabsContent value="heap-dump" className="mt-6">
                <HeapDumpAnalyzer />
              </TabsContent>

              <TabsContent value="jboss-logs" className="mt-6">
                <JBossLogAnalyzer />
              </TabsContent>

              <TabsContent value="mysql-queries" className="mt-6">
                <MySQLQueryAnalyzer />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
